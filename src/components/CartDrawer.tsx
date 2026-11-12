"use client";

import { useCartStore } from "@/lib/cartStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Send,
  Sparkles,
  MapPin,
  UtensilsCrossed,
  Truck,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { RESTAURANT_INFO } from "@/data/menu";
import { useBodyScrollLock } from "@/lib/useBodyScrollLock";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    orderType,
    setOrderType,
    customerAddress,
    setCustomerAddress,
    getSubtotal,
    getDeliveryFee,
    getFinalTotal,
    getAmountUntilFreeDelivery,
    generateWhatsAppUrl,
  } = useCartStore();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const finalTotal = getFinalTotal();
  const amountToFree = getAmountUntilFreeDelivery();
  const progressPercent = Math.min(100, Math.round((subtotal / RESTAURANT_INFO.minimumOrder) * 100));

  // Lock background webpage scroll while cart drawer is open
  useBodyScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] overflow-hidden overscroll-none touch-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity touch-none"
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="w-screen max-w-md bg-[#FCFBF7] shadow-2xl flex flex-col border-l border-[#E11D48]/15 relative z-10 touch-auto"
            >
              {/* Header */}
              <div className="px-4 sm:px-5 py-4 bg-[#0F172A] text-white flex items-center justify-between shadow-md border-b-2 border-[#F59E0B]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#E11D48] text-[#FBBF24] flex items-center justify-center font-bold shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg sm:text-xl font-display tracking-wide truncate">
                        Your Order Cart
                      </h2>
                      <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full bg-[#F59E0B] text-[#0F172A] whitespace-nowrap shrink-0">
                        {items.reduce((acc, i) => acc + i.quantity, 0)} items
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 font-medium truncate">Top Taste Shawarma &amp; Pizza • Kasur</p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0 ml-2"
                  aria-label="Close cart drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Meter (Min. Rs 600) */}
              <div className="bg-[#FEF3C7] px-5 py-3 border-b border-[#F59E0B]/30">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="flex items-center gap-1.5 text-[#0F172A]">
                    <Truck className="w-4 h-4 text-[#E11D48]" />
                    {amountToFree === 0 ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> FREE Home Delivery Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add <strong className="text-[#E11D48]">Rs {amountToFree}</strong> more for{" "}
                        <strong className="text-emerald-700">FREE Delivery (Min Rs 600)</strong>
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-bold text-[#E11D48]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      amountToFree === 0 ? "bg-emerald-600" : "bg-[#E11D48]"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Order Mode Toggle */}
              <div className="p-4 bg-white border-b border-gray-100">
                <div className="grid grid-cols-2 p-1 bg-[#FEF3C7] rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setOrderType("delivery")}
                    className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === "delivery"
                        ? "bg-[#E11D48] text-white shadow-sm"
                        : "text-[#0F172A] hover:text-[#E11D48]"
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" /> Home Delivery
                  </button>
                  <button
                    onClick={() => setOrderType("takeaway")}
                    className={`py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      orderType === "takeaway"
                        ? "bg-[#E11D48] text-white shadow-sm"
                        : "text-[#0F172A] hover:text-[#E11D48]"
                    }`}
                  >
                    <UtensilsCrossed className="w-3.5 h-3.5" /> Takeaway / Pickup
                  </button>
                </div>
              </div>

              {/* Items List or Empty State */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-[#FEF3C7] border-2 border-dashed border-[#F59E0B] flex items-center justify-center text-3xl">
                      🌯
                    </div>
                    <div>
                      <h3 className="text-lg font-display text-[#0F172A]">Your Cart is Empty!</h3>
                      <p className="text-xs text-[#64748B] max-w-xs mt-1">
                        Hungry? Savor Special Shawarma, Crown Crust Pizza, Karahi, Handi, Burgers &amp; Loaded Fries!
                      </p>
                    </div>
                    <button
                      onClick={closeCart}
                      className="px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 shadow"
                    >
                      Explore Menu <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex items-center gap-3"
                    >
                      <div
                        className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#FEF3C7]"
                        style={{ position: "relative" }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-bold text-[#0F172A] truncate leading-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            className="text-gray-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                          {item.sizeName && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E]">
                              {item.sizeName}
                            </span>
                          )}
                          {item.flavour && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                              {item.flavour}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-[#E11D48]">
                            Rs {(item.price * item.quantity).toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2 bg-[#FCFBF7] border border-gray-200 rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#E11D48] hover:bg-[#FEF3C7] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-[#0F172A]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#E11D48] hover:bg-[#FEF3C7] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Checkout Controls */}
              {items.length > 0 && (
                <div className="p-4 bg-white border-t border-gray-100 space-y-3">
                  {/* Address Input */}
                  <div>
                    <label className="text-xs font-bold text-[#0F172A] flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                      {orderType === "delivery" ? "Delivery Address in Kasur:" : "Special Pickup Note:"}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        orderType === "delivery"
                          ? "e.g. House #, Street, Near Baldia Chowk / Noor Masjid"
                          : "e.g. Pickup in 20 mins, extra sauce"
                      }
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 bg-[#FCFBF7] focus:border-[#E11D48] focus:outline-none"
                    />
                  </div>

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#64748B] pt-1">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-[#0F172A]">Rs {subtotal.toLocaleString()}</span>
                    </div>
                    {orderType === "delivery" && (
                      <div className="flex justify-between items-center">
                        <span>Home Delivery</span>
                        <span className="font-semibold">
                          {deliveryFee === 0 ? (
                            <span className="text-emerald-700 font-bold">FREE (Above Rs 600)</span>
                          ) : (
                            <span>Rs {deliveryFee} (Free at Rs 600)</span>
                          )}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-[#E11D48] pt-1 border-t border-gray-100">
                      <span>Total Amount</span>
                      <span>Rs {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* WhatsApp Order Button */}
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/25 transition-all transform active:scale-[0.99] cursor-pointer"
                  >
                    <Send className="w-4 h-4 fill-white" />
                    <span>Send Order on WhatsApp</span>
                    <span className="ml-auto bg-black/15 px-2 py-0.5 rounded text-xs font-mono">
                      Rs {finalTotal.toLocaleString()}
                    </span>
                  </a>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                    <span>Direct Hotline: {RESTAURANT_INFO.phonePrimary}</span>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Clear Bag
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
