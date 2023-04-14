import React from "react";
import { useFormik } from "formik";
import { createSchema } from "../schema/createSchema";

const onSubmit = async (values, actions) => {
  console.log("submitted");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const ModalForm = ({ isOpen, onClose }) => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        craft: "",
        product_description: "",
        years_of_experience: "",
        price_rate: "",
        product_image: "",
        contact_details: "",
      },
      validationSchema: createSchema,
      onSubmit,
    });

  console.log(errors);
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-10 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Add your craft
                </h3>
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit}
                    action=""
                    method="post"
                    className="space-y-6 flex flex-col pr-4"
                  >
                    <div className="pb-4 flex-grow">
                      <label htmlFor="email"></label>
                      <input
                        value={values.craft}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        id="craft"
                        placeholder="Enter your craft"
                        className={
                          errors.craft && touched.craft
                            ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                            : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                        }
                      />
                      {errors.craft && touched.craft && (
                        <p className="text-red-600 text-xs">{errors.craft}</p>
                      )}
                    </div>

                    <div className="pb-4 flex-grow">
                      <label htmlFor="product_description"></label>
                      <input
                        value={values.product_description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        id="product_description"
                        placeholder="product description"
                        className={
                          errors.product_description &&
                          touched.product_description
                            ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                            : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                        }
                      />
                      {errors.product_description &&
                        touched.product_description && (
                          <p className="text-red-600 text-xs">
                            {errors.product_description}
                          </p>
                        )}
                    </div>

                    <div className="pb-4 flex-grow">
                      <label htmlFor="years_of_experience"></label>
                      <input
                        value={values.years_of_experience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                        id="years_of_experience"
                        placeholder="years of experience"
                        className={
                          errors.years_of_experience &&
                          touched.years_of_experience
                            ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                            : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                        }
                      />
                      {errors.years_of_experience &&
                        touched.years_of_experience && (
                          <p className="text-red-600 text-xs">
                            {errors.years_of_experience}
                          </p>
                        )}
                    </div>

                    <div className="pb-4 flex-grow">
                      <label htmlFor="price_rate"></label>
                      <input
                        value={values.price_rate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        id="price_rate"
                        placeholder="price rate"
                        className={
                          errors.price_rate && touched.price_rate
                            ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                            : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                        }
                      />
                      {errors.price_rate && touched.price_rate && (
                        <p className="text-red-600 text-xs">
                          {errors.price_rate}
                        </p>
                      )}
                    </div>

                    <div className="pb-4 flex-grow">
                      <label htmlFor="price_rate"></label>
                      <input
                        value={values.contact_details}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="number"
                        id="contact_details"
                        placeholder="Phone number"
                        className={
                          errors.contact_details && touched.contact_details
                            ? "input-error bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                            : "bg-[#fff] border-2 rounded p-2 md:p-4 w-full"
                        }
                      />
                      {errors.contact_details && touched.contact_details && (
                        <p className="text-red-600 text-xs">
                          {errors.contact_details}
                        </p>
                      )}
                    </div>

                    <div className="pb-4 flex-grow">
                      <label
                        htmlFor="image"
                        className="bg-gray-200 py-2 px-4 rounded-md cursor-pointer"
                      >
                        Choose File
                      </label>
                      <input
                        value={values.product_image}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="file"
                        id="product_image"
                        name="product_image"
                        className={
                          errors.product_image && touched.product_image
                            ? "input-error hidden"
                            : "hidden"
                        }
                      />
                      {errors.product_image && touched.product_image && (
                        <p className="text-red-600 text-xs mt-5">
                          {errors.product_image}
                        </p>
                      )}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <button
                        type="submit"
                        className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        // onClick={onClose}
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
