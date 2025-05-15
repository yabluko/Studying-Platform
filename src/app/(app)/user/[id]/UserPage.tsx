'use client';

import React from 'react';

type User = {
  name: string;
  email: string;
} | undefined;

type Props = {
  user: User;
};

function UserPage({ user }: Props) {
  return (
    <>
      <h1>User Page</h1>
      <div className="grid grid-cols-2 p-2 gap-2">
        <p className="p-2 text-slate-400">Name:</p>
        <p className="p-2 text-slate-950">{user?.name ?? 'N/A'}</p>
        <p className="p-2 text-slate-400">Email:</p>
        <p className="p-2 text-slate-950">{user?.email ?? 'N/A'}</p>
      </div>
    </>
  );
}

export default UserPage;
