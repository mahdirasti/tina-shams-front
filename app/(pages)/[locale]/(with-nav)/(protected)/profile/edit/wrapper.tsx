"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/app/lib/axios";
import { useLocale } from "@/app/(pages)/[locale]/locale-context";
import { OrgButton } from "@/components/shared-ui";

export default function ProfileEditWrapper() {
  const { dict } = useLocale();

  // Shipping addresses state
  type ShippingAddress = {
    _id: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    country: string;
    region: string;
    postal_code: string;
    is_default?: boolean;
  };

  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState<boolean>(false);
  const [savingAddress, setSavingAddress] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<
    Omit<ShippingAddress, "_id"> & { is_default?: boolean }
  >({
    address_line1: "",
    address_line2: "",
    city: "",
    country: "IR",
    region: "",
    postal_code: "",
    is_default: false,
  });

  const resetForm = () => {
    setEditingId(null);
    setForm({
      address_line1: "",
      address_line2: "",
      city: "",
      country: "IR",
      region: "",
      postal_code: "",
      is_default: false,
    });
  };

  const loadAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const res = await axiosInstance.get("/users/me/shipping-addresses");
      const data = (res as any)?.data?.data as ShippingAddress[];
      setAddresses(Array.isArray(data) ? data : []);
    } catch (e) {
      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const startEdit = (a: ShippingAddress) => {
    setEditingId(a._id);
    setForm({
      address_line1: a.address_line1 || "",
      address_line2: a.address_line2 || "",
      city: a.city || "",
      country: a.country || "IR",
      region: a.region || "",
      postal_code: a.postal_code || "",
      is_default: !!a.is_default,
    });
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAddress(true);
    try {
      if (editingId) {
        await axiosInstance.patch(
          `/users/me/shipping-addresses/${editingId}`,
          form
        );
      } else {
        await axiosInstance.post("/users/me/shipping-addresses", form);
      }
      await loadAddresses();
      resetForm();
    } catch (e) {
    } finally {
      setSavingAddress(false);
    }
  };

  const deleteAddress = async (id: string) => {
    try {
      await axiosInstance.delete(`/users/me/shipping-addresses/${id}`);
      await loadAddresses();
      if (editingId === id) resetForm();
    } catch (e) {}
  };

  const makeDefault = async (id: string) => {
    try {
      await axiosInstance.post(`/users/me/shipping-addresses/${id}/default`);
      await loadAddresses();
    } catch (e) {}
  };

  return (
    <div className='space-y-12 sm:space-y-16 mt-4'>
      {/* Shipping Addresses */}
      <div>
        <h2 className='text-base/7 font-semibold text-gray-900'>
          {dict?.common?.shipping_addresses || "Shipping Addresses"}
        </h2>
        <p className='mt-1 max-w-2xl text-sm/6 text-gray-600'>
          {dict?.common?.manage_saved_addresses ||
            "Manage your saved addresses for faster checkout."}
        </p>

        <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 p-4'>
              <h3 className='text-sm font-medium text-gray-900'>
                {editingId ? "Edit address" : "Add new address"}
              </h3>
              <form onSubmit={submitForm} className='mt-4 space-y-4'>
                <div>
                  <label
                    htmlFor='ship-address-line1'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    {dict?.common?.address_line1 || "Address line 1"}
                  </label>
                  <input
                    id='ship-address-line1'
                    name='address_line1'
                    type='text'
                    value={form.address_line1}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        address_line1: e.target.value,
                      }))
                    }
                    required
                    className='mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
                  />
                </div>
                <div>
                  <label
                    htmlFor='ship-address-line2'
                    className='block text-sm/6 font-medium text-gray-900'
                  >
                    {dict?.common?.address_line2 || "Address line 2"}
                  </label>
                  <input
                    id='ship-address-line2'
                    name='address_line2'
                    type='text'
                    value={form.address_line2}
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        address_line2: e.target.value,
                      }))
                    }
                    className='mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <label
                      htmlFor='ship-city'
                      className='block text-sm/6 font-medium text-gray-900'
                    >
                      {dict?.common?.city || "City"}
                    </label>
                    <input
                      id='ship-city'
                      name='city'
                      type='text'
                      value={form.city}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, city: e.target.value }))
                      }
                      required
                      className='mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='ship-region'
                      className='block text-sm/6 font-medium text-gray-900'
                    >
                      {dict?.common?.region || "Region / State"}
                    </label>
                    <input
                      id='ship-region'
                      name='region'
                      type='text'
                      value={form.region}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, region: e.target.value }))
                      }
                      required
                      className='mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-primary sm:text-sm/6'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='ship-postal'
                      className='block text-sm/6 font-medium text-gray-900'
                    >
                      {dict?.common?.postal_code || "Postal code"}
                    </label>
                    <input
                      id='ship-postal'
                      name='postal_code'
                      type='text'
                      value={form.postal_code}
                      onChange={(e) =>
                        setForm((s) => ({
                          ...s,
                          postal_code: e.target.value,
                        }))
                      }
                      required
                      className='mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='ship-country'
                      className='block text-sm/6 font-medium text-gray-900'
                    >
                      {dict?.common?.country || "Country"}
                    </label>
                    <select
                      id='ship-country'
                      name='country'
                      value={form.country}
                      onChange={(e) =>
                        setForm((s) => ({ ...s, country: e.target.value }))
                      }
                      className='mt-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6'
                    >
                      <option value='IR'>{dict?.common?.iran || "Iran"}</option>
                      <option value='US'>
                        {dict?.common?.united_states || "United States"}
                      </option>
                      <option value='CA'>
                        {dict?.common?.canada || "Canada"}
                      </option>
                      <option value='DE'>
                        {dict?.common?.germany || "Germany"}
                      </option>
                    </select>
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <label className='flex items-center gap-2 text-sm text-gray-700'>
                    <input
                      type='checkbox'
                      checked={!!form.is_default}
                      onChange={(e) =>
                        setForm((s) => ({
                          ...s,
                          is_default: e.target.checked,
                        }))
                      }
                      className='size-4 rounded border-gray-300 text-primary focus:ring-primary'
                    />
                    <span>
                      {dict?.common?.set_as_default || "Set as default"}
                    </span>
                  </label>
                  <div className='flex gap-2'>
                    {editingId && (
                      <button
                        type='button'
                        onClick={resetForm}
                        className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                      >
                        {dict?.common?.cancel || "Cancel"}
                      </button>
                    )}
                    <OrgButton type='submit' disabled={savingAddress}>
                      {savingAddress
                        ? dict?.common?.saving || "Saving..."
                        : editingId
                        ? dict?.common?.save || "Save"
                        : dict?.common?.add || "Add"}
                    </OrgButton>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='rounded-lg border border-gray-200 p-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-medium text-gray-900'>
                  {dict?.common?.saved_addresses || "Saved addresses"}
                </h3>
                {loadingAddresses && (
                  <span className='text-xs text-gray-500'>
                    {dict?.common?.loading || "Loading..."}
                  </span>
                )}
              </div>
              <ul role='list' className='mt-4 divide-y divide-gray-200'>
                {addresses.length === 0 && !loadingAddresses && (
                  <li className='py-4 text-sm text-gray-500'>
                    {dict?.common?.no_addresses_saved || "No addresses saved."}
                  </li>
                )}
                {addresses.map((a) => (
                  <li key={a._id} className='py-4'>
                    <div className='flex items-start justify-between gap-4'>
                      <div className='text-sm text-gray-700'>
                        <div className='font-medium text-gray-900'>
                          {a.address_line1}
                          {a.address_line2 ? `, ${a.address_line2}` : ""}
                        </div>
                        <div>
                          {a.city}, {a.region}, {a.postal_code}
                        </div>
                        <div>{a.country}</div>
                        {a.is_default && (
                          <span className='mt-1 inline-flex items-center rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
                            {dict?.common?.default || "Default"}
                          </span>
                        )}
                      </div>
                      <div className='flex shrink-0 items-center gap-2'>
                        <button
                          type='button'
                          onClick={() => startEdit(a)}
                          className='rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                        >
                          {dict?.common?.edit || "Edit"}
                        </button>
                        {!a.is_default && (
                          <button
                            type='button'
                            onClick={() => makeDefault(a._id)}
                            className='rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                          >
                            {dict?.common?.make_default || "Make default"}
                          </button>
                        )}
                        <button
                          type='button'
                          onClick={() => deleteAddress(a._id)}
                          className='rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-200 hover:bg-red-50'
                        >
                          {dict?.common?.delete || "Delete"}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
