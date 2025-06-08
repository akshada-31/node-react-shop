import Layout from "../Layouts/Layouts";
import { orderDetailAction } from "../Redux/Actions/Order";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderListAction } from "../Redux/Actions/Order";
import moment from "moment";
import { Loading } from "../components/Loading";

export function OrderHistory() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(orderListAction());
    }, [dispatch]);

    const orderListReducer = useSelector((state) => state.orderListReducer);
    const { orders, loading, error } = orderListReducer;

    return (
        <>
            <Layout>
                {loading ? (
                    <Loading />
                ) : (
                    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <div className="mx-auto max-w-5xl">
                                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My orders</h2>

                                    <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                                        <div>
                                            <label htmlFor="order-type" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
                                            <select id="order-type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                                <option defaultValue>All orders</option>
                                                <option value="pre-order">Pre-order</option>
                                                <option value="transit">In transit</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>

                                        <span className="inline-block text-gray-500 dark:text-gray-400"> from </span>

                                        <div>
                                            <label htmlFor="duration" className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select duration</label>
                                            <select id="duration" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                                <option defaultValue>this week</option>
                                                <option value="this month">this month</option>
                                                <option value="last 3 months">the last 3 months</option>
                                                <option value="lats 6 months">the last 6 months</option>
                                                <option value="this year">this year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flow-root sm:mt-8">
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {orders && orders.map((order) => (
                                            <div key={order.id} className="py-4">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 border-b border-gray-200 dark:border-gray-700 py-6">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                                                        <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">
                                                            #{order._id}
                                                        </dd>
                                                    </dl>

                                                    <dl>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date:</dt>
                                                        <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                            {moment(order.createdAt).format("MMM Do YY")}
                                                        </dd>
                                                    </dl>

                                                    <dl>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Price:</dt>
                                                        <dd className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                                            ${order.totalPrice}
                                                        </dd>
                                                    </dl>

                                                    <dl>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                                                        <dd className={
                                                            order.isPaid
                                                                ? "mt-1 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                                                                : "mt-1 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
                                                        }>
                                                            {order.isPaid ? "Paid" : "Not Paid yet"}
                                                        </dd>
                                                    </dl>
                                                </div>

                                                <div className="mt-4 flex justify-end">
                                                    <button
                                                        type="button"
                                                        className="rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                    >
                                                        Order again
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </Layout>
        </>
    );
}
