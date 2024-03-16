/** @format */

import PageTitle from "../components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "../components/Card";
import BarChart from "../components/BarChart";
import SalesCard, { SalesProps } from "../components/SalesCard";
import React, { Children } from "react";

export default function Home() {
  return (
    <div className="flex flex-wrap p-3 m-3 justify-around ">
      <div className="f card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home1"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Name of the property
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>property description</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">price</div>
            <div className="badge badge-outline">address</div>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1591870510340-c8578d6c3b5f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home2"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Name of the property
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>property description</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">price</div>
            <div className="badge badge-outline">address</div>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home3"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Name of the property
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>property description</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">price</div>
            <div className="badge badge-outline">address</div>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home4"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Name of the property
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>property description</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">price</div>
            <div className="badge badge-outline">address</div>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home5"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Name of the property
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>property description</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">price</div>
            <div className="badge badge-outline">address</div>
          </div>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="home6"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            Name of the property
            <div className="badge badge-secondary">NEW</div>
          </h2>
          <p>property description</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">price</div>
            <div className="badge badge-outline">address</div>
          </div>
        </div>
      </div>
    </div>
  );
}
