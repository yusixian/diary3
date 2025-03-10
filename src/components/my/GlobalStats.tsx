'use client';

import { onLogoutClickClearState } from '@/entry/login-user-slice';
import { selectLoginUser, useAppDispatch, useAppSelector } from '@/entry/store';
import { globalStateAtom, loadDialogOpenAtom } from '@/atoms/app';
import { safeNumberValue } from '@/utils';
import clsx from 'clsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import Button from '../button';
import { saveStateToGithub } from '@/utils/GithubStorage';
import { useClerk } from '@clerk/nextjs';

function GlobalStats({ className }: { className?: string }) {
  const loginUser = useAppSelector(selectLoginUser);
  const save = useCallback(() => saveStateToGithub(loginUser), [loginUser]);
  const setLoadOpen = useSetAtom(loadDialogOpenAtom);
  const globalState = useAtomValue(globalStateAtom);
  const dispatch = useAppDispatch();
  const { signOut } = useClerk();
  const onLogoutClick = () => {
    dispatch(onLogoutClickClearState());
    signOut();
  };
  return (
    <div className={clsx('flex flex-col justify-between gap-10 text-white', className)}>
      <div className="flex flex-col items-center gap-2">
        <img
          className="h-20 w-20 rounded-full border-2 border-white bg-white/30"
          src="https://fakeimg.pl/200x200/?text=Avatar"
          alt="avatar"
        />
        <h1 className="text-2xl font-bold">{loginUser.uid}</h1>
      </div>
      <div className="flex flex-col gap-4 text-lg">
        <p>
          You have signed up for Diary for{' '}
          <span className="font-DDin text-2xl font-bold">{safeNumberValue(globalState?.registeredSince)}</span> days.
        </p>
        <p>
          You recorded entries in Diary for{' '}
          <span className="font-DDin text-2xl font-bold">{safeNumberValue(globalState?.entryDays)}</span> days.
        </p>
        <p>
          You recorded in total{' '}
          <span className="font-DDin text-2xl font-bold">{safeNumberValue(globalState?.totalEntries)}</span> entries.
        </p>
        <p>
          In your historical longest streak, you recorded entries for{' '}
          <span className="font-DDin text-2xl font-bold">{safeNumberValue(globalState?.historicalLongestStreakByEntry)}</span>{' '}
          days.
        </p>
        <p>
          In your current streak, you recorded entries for{' '}
          <span className="font-DDin text-2xl font-bold">{safeNumberValue(globalState?.currentStreakByEntry)}</span> days.
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <Button size="large" className="h-12 rounded-full border-none hover:opacity-90" onClick={save}>
          Save
        </Button>
        <Button size="large" className="h-12 rounded-full border-none hover:opacity-90" onClick={() => setLoadOpen(true)}>
          Load
        </Button>
        <Button
          size="large"
          className="h-12 rounded-full border-none text-black hover:opacity-90"
          type="link"
          onClick={onLogoutClick}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
export default GlobalStats;
