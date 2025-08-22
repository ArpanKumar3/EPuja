import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  LayoutDashboard,
  CalendarCheck,
  User,
  Wallet,
  LifeBuoy,
  X,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, end: true },
  { name: 'My Pujas', href: 'pujas', icon: CalendarCheck },
  { name: 'My Profile', href: 'profile', icon: User },
  { name: 'Wallet', href: 'wallet', icon: Wallet },
  { name: 'Support', href: 'support', icon: LifeBuoy },
];

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { signOut } = useAuth();
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <X className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <SidebarContent signOut={signOut} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <SidebarContent signOut={signOut} />
          </div>
        </div>
      </div>
    </>
  );
};

const SidebarContent = ({ signOut }) => (
    <>
    <div className="flex items-center flex-shrink-0 px-4">
        <Link to="/" className="text-3xl font-bold text-brand-orange font-heading">
            ePuja
        </Link>
    </div>
    <nav className="mt-5 flex-1 px-2 space-y-1">
        {navigation.map((item) => (
        <NavLink
            key={item.name}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
            `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                ? 'bg-saffron text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`
            }
        >
            <item.icon
            className={`mr-3 flex-shrink-0 h-6 w-6 ${
                'text-gray-400 group-hover:text-gray-500'
            }`}
            aria-hidden="true"
            />
            {item.name}
        </NavLink>
        ))}
    </nav>
    <div className="mt-auto px-2 pb-2">
        <button
            onClick={signOut}
            className="group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
            <LogOut className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
            Logout
        </button>
    </div>
    </>
);


export default DashboardSidebar;
