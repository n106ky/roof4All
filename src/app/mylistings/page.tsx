type Props = {};
import { MapPin, BedDouble, LayoutList, Car, Bath } from "lucide-react";
import PageTitle from "../components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "../components/Card";
import BarChart from "../components/BarChart";
import SalesCard, { SalesProps } from "../components/SalesCard";
import React, { Children } from "react";

export default function mylistingsPage({}: Props) {
    return (
      <section>
        {/* nav bar for the listings  */}
        <div className=" flex navbar bg-base-100 border rounded-lg mb-6">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">My listings</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a>
                  Change view <LayoutList />
                </a>
              </li>
              <li>
                <details>
                  <summary>Location</summary>
                  <ul className="p-2 bg-base-100 rounded-t-none ">
                    <li>
                      <a>Toronto</a>
                    </li>
                    <li>
                      <a>Vancouver</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>

        {/* listings section  */}
        <div className="flex flex-wrap justify-around gap-6 ">
          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>

          <div className="card w-60  bg-base-100 shadow-xl size-100 border">
            <figure className="pb-0 pr-2 pl-2 pt-2">
              <img
                className="flex w-full size-30 border rounded-lg"
                src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="home1"
              />
            </figure>
            <div className="card-body pl-3 pt-2 pr-3">
              <h1 className="card-title text-sm">
                Spacious near stop room
                <div className="text-blue-600">$650</div>
              </h1>
              <div className="flex text-xs ">
                <MapPin style={{ width: "14px", height: "14px" }} />
                <p className="pl-1">17 Wanderust way, Finch Ave.</p>
              </div>
              <div className="flex text-xs border-dashed border-b-2 pb-2 ">
                <p>
                  <BedDouble size={12} />
                  Space for 3
                </p>
                <p>
                  <Bath size={12} />
                  1.5
                </p>
                <p>
                  <Car size={12} />3
                </p>
              </div>
              <div className="text-xs">
                Price indicated are for one person, not the whole apartment.
                Open property page to read more details.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

