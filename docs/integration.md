# Upcoming GitHub integration

We plan to import a user's public GitHub repositories into the app. No integration has been built yet. First understand request authentication, pagination and error responses. Reference: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user . Public reads work without a token within GitHub's anonymous rate limits; authenticated requests can use a separately supplied GITHUB_TOKEN, but this checkout has no live credential. Use public gauge-sh repository metadata for exploratory requests. Do not make account or repository changes.
