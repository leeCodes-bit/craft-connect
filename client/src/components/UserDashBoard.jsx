import React, {useState} from "react";
import Image1 from "../assets/guitar.jpeg";
import NavBar3 from "./NavBar3";
import HeroSection from "./HeroSection2";
import ModalForm from './ModalForm';
import ProfileIcon from "./ProfileIcon";



const UserDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="container-fluid">
      <NavBar3 />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            Hi Emmanuel welcome!!!
          </h1>
          <ProfileIcon name="Emmanuel" />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow border-2 overflow-hidden sm:rounded-lg">
            <div className="p-4 sm:px-6">
              <div className="flex items-center justify-center">
                <img
                  className="h-32 w-32 rounded-full"
                  src={Image1}
                  alt="fhhts`s"
                />
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Fullname
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                    Emmanuel omeje
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                    www.yahoo.com
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                    09176272890011
                  </dd>
                </div>

                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Skills description
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 text-right">
                    Getting all necessary
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className="flex justify-center py-6">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"onClick={openModal}>Post your craft</button>
      <ModalForm isOpen={isOpen} onClose={closeModal} />
    </div>
      </main>
      <HeroSection />
    </div>
  );
};

export default UserDashboard;
