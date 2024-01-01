"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import type { User } from "next-auth";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

type Props = {
  user: User;
};

export default function ProfileDropdown({ user }: Props) {
  return (
    <div>
      <Menu as="div" className="relative z-auto inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            {user.image ? (
              <Image
                className="rounded-full hover:border-2 hover:border-white"
                src={user.image}
                width={30}
                height={30}
                alt="User avatar"
              />
            ) : (
              <span>user icon</span>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-slate-800 shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? "bg-slate-600 text-white" : "text-white"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <ArrowLeftStartOnRectangleIcon
                      className={`${
                        active ? "text-white" : "text-slate-400"
                      } mr-3 h-5 w-5`}
                      aria-hidden="true"
                    />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
