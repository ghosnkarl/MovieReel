#!/bin/bash

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -m)
            if [[ -n "$2" ]]; then
                COMMIT_MESSAGE="$2"
                shift
            else
                echo "Missing value for -m argument"
                exit 1
            fi
            ;;
        *)
            echo "Unknown parameter passed: $1"
            exit 1
            ;;
    esac
    shift
done

# Check if the profile argument is provided
if [[ -z "$COMMIT_MESSAGE" ]]; then
    echo "Missing -m argument"
    exit 1
fi

# Read the contents of version_number.js into a variable
version_file=$(cat src/version_number.ts)

echo $version_file

# Use a regular expression to extract the version number from the file
version_regex="const movie_reel_version = ['\"]([0-9]+\.[0-9]+\.[0-9]+)['\"]"
if [[ $version_file =~ $version_regex ]]; then
  movie_reel_version=${BASH_REMATCH[1]}
else
  echo "Error: Could not extract version number from version_number.ts"
  exit 1
fi

# Use the version number in a command
echo "The current version is $movie_reel_version"

# Create new tag
TAG_NAME="v$movie_reel_version"

# Check if release with tag already exists
output=$(git ls-remote --tags origin "refs/tags/$TAG_NAME")
if [[ $output == *"refs/tags/$TAG_NAME"* ]]; then
    echo "Release $TAG_NAME exists."
    echo "Please make sure to increase the version number"
    exit 1
else
    echo "Release $TAG_NAME does not exist."
fi

echo "Creating new release"

npm version $movie_reel_version --no-git-tag-version --allow-same-version

# commit changes
git add .
git commit -m "R $TAG_NAME: $COMMIT_MESSAGE"
git push

# create tag and push to remote repository
git tag -a "$TAG_NAME" -m "Release $TAG_NAME"
git push origin "$TAG_NAME"
