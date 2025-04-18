<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class ThemeFileController extends Controller
{
    public function updateThemeFile(Request $request)
    {

        // Validate input
        $validator = Validator::make($request->all(), [
            'shopifyDomain' => 'required|string',
            'accessToken' => 'required|string',
            'themeId' => 'required|string',
            'filename' => 'required|string',
            'findString' => 'required|string',
            'replaceString' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 400);
        }

        $shopifyDomain = 'param-patel-102.myshopify.com';
        $accessToken = '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';
        $themeId = $request->input('themeId');
        $filename = $request->input('filename');
        $findString = $request->input('findString');
        $replaceString = $request->input('replaceString');

        // Step 1: Fetch the file content
        $fetchQuery = <<<GRAPHQL
        query {
          theme(id: "$themeId") {
            id
            name
            role
            files(filenames: ["$filename"], first: 1) {
              nodes {
                body {
                  ... on OnlineStoreThemeFileBodyText {
                    content
                  }
                }
              }
            }
          }
        }
        GRAPHQL;

        try {
            Log::info("Fetching content of $filename from theme $themeId...");
            $fetchResponse = Http::withHeaders([
                'X-Shopify-Access-Token' => $accessToken,
            ])->post("https://$shopifyDomain/admin/api/2025-04/graphql.json", [
                'query' => $fetchQuery,
            ])->json();
            // Check for GraphQL errors
            if (isset($fetchResponse['errors'])) {
                $errorMessages = collect($fetchResponse['errors'])->pluck('message')->implode('; ');
                throw new \Exception("GraphQL errors: $errorMessages");
            }

            $fileNode = $fetchResponse['data']['theme']['files']['nodes'][0] ?? null;

            if (!$fileNode || !isset($fileNode['body']['content'])) {
                throw new \Exception("File $filename not found in theme $themeId");
            }

            $originalContent = $fileNode['body']['content'];
            Log::info("Original content fetched (length: " . strlen($originalContent) . " characters)");

            // Step 2: Perform find and replace (only once)
            $escapedFindString = preg_quote($findString, '/');
            $modifiedContent = preg_replace("/$escapedFindString/", $replaceString, $originalContent, 1);
            // dd($modifiedContent);


            if ($modifiedContent === $originalContent) {
                Log::warning("No replacement made: The string to find was not present in $filename");
                return response()->json([
                    'status' => false,
                    'message' => "No replacement made: The string to find was not present",
                ], 200);
            }

            Log::info("Content modified (new length: " . strlen($modifiedContent) . " characters)");

            // Step 3: Upsert the modified content
            $upsertMutation = <<<GRAPHQL
            mutation themeFilesUpsert(\$files: [OnlineStoreThemeFilesUpsertFileInput!]!, \$themeId: ID!) {
              themeFilesUpsert(files: \$files, themeId: \$themeId) {
                upsertedThemeFiles {
                  filename
                }
                userErrors {
                  field
                  message
                }
              }
            }
            GRAPHQL;

            $upsertVariables = [
                'themeId' => $themeId,
                'files' => [
                    [
                        'filename' => $filename,
                        'body' => [
                            'type' => 'TEXT',
                            'value' => $modifiedContent,
                        ],
                    ],
                ],
            ];

            Log::info("Upserting modified content to $filename...");
            $upsertResponse = Http::withHeaders([
                'X-Shopify-Access-Token' => $accessToken,
            ])->post("https://$shopifyDomain/admin/api/2025-04/graphql.json", [
                'query' => $upsertMutation,
                'variables' => $upsertVariables,
            ])->json();

            // Check for GraphQL errors
            if (isset($upsertResponse['errors'])) {
                $errorMessages = collect($upsertResponse['errors'])->pluck('message')->implode('; ');
                throw new \Exception("GraphQL errors: $errorMessages");
            }

            $upsertedThemeFiles = $upsertResponse['data']['themeFilesUpsert']['upsertedThemeFiles'] ?? [];
            $userErrors = $upsertResponse['data']['themeFilesUpsert']['userErrors'] ?? [];

            if (!empty($userErrors)) {
                $errorMessages = collect($userErrors)->map(function ($err) {
                    return "Field: " . implode(', ', $err['field']) . ", Message: " . $err['message'];
                })->implode('; ');
                throw new \Exception("Failed to upsert file: $errorMessages");
            }

            if (!empty($upsertedThemeFiles)) {
                Log::info("Successfully upserted $filename");
                return response()->json([
                    'status' => true,
                    'message' => "File $filename updated successfully",
                    'data' => [
                        'upsertedFiles' => $upsertedThemeFiles,
                    ],
                ], 200);
            } else {
                throw new \Exception("Upsert completed but no files were returned");
            }
        } catch (\Exception $e) {
            Log::error("Error updating theme file: " . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => "Error: " . $e->getMessage(),
            ], 500);
        }
    }
}
