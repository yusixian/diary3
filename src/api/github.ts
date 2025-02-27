import { selectLoginUser, useAppSelector } from '@/entry/store';
import { Octokit } from '@octokit/rest';
import { useQuery } from '@tanstack/react-query';

export const useFetchCommits = () => {
  const loginUser = useAppSelector(selectLoginUser);

  return useQuery(
    ['fetch_commits', loginUser],
    async () => {
      if (!loginUser?.uid || !loginUser?.repo || !loginUser?.githubSecret) {
        return [];
      }

      const octokit = new Octokit({
        auth: loginUser.githubSecret,
        userAgent: 'diary-app',
      });
      const owner = loginUser.uid;
      const repo = loginUser.repo;
      const commits = await octokit.rest.repos.listCommits({
        owner,
        repo,
      });
      return commits.data.filter(({ commit }) => commit?.message?.startsWith(`dairy-save-`)).map((item) => item.commit);
    },
    {
      enabled: !!(loginUser?.uid && loginUser?.repo && loginUser?.githubSecret),
    },
  );
};
