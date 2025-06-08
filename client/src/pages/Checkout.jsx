'use client'

import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { addToCartAction, removeFromCartAction } from '../Redux/Actions/Cart'
import {Link} from "react-router-dom";
import CartItem from '../components/CartItem'
export default function Checkout({ open, setOpen }) {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cartReducer)
  const { cartItems } = cart

  const removeFromCartHandler = (id) => {
    console.log("Remove button WAS CLICKED for product ID:", id)
    dispatch(removeFromCartAction(id))
  }

  const addToCartHandler = (id, qty) => {
    dispatch(addToCartAction(id, qty))
  }

  const total=cartItems.reduce((total,item)=>total+item.qty*item.price,0).toFixed(2)

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      {/* Backdrop behind the modal */}
      <div className="fixed inset-0 bg-gray-500/75 transition-opacity z-10" aria-hidden="true" />

      {/* Modal container */}
      <div className="fixed inset-0 overflow-hidden z-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700 relative z-[9999] bg-white shadow-xl">
              <div className="flex h-full flex-col overflow-y-scroll">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <CartItem cartItems={cartItems}></CartItem>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                      $
                      {total}
                    </p>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <Link
                      to="/placeorder"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-xs hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-xs text-gray-500">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
