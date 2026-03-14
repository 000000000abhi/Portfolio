import { fetchGitHubRepos } from './lib/github';

async function main() {
  const repos = await fetchGitHubRepos();
  console.log(`Fetched ${repos.length} repositories`);
  console.log(repos.slice(0, 2));
}

main().catch(console.error);
