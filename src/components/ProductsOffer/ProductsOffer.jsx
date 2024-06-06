import React, { useEffect, useState } from "react";
import "./ProductsOffer.css";
import ProductInOfferDisplay from "../ProductInOfferDisplay/ProductInOfferDisplay";
import axios from "axios";

const ProductsOffer = ({
  cat_id,
  description,
  reverse_layout,
  title,
  type_of_display,
}) => {
  const [products, set_products] = useState([]);

  const GetMostSoldProducts = async () => {
    let response = await axios.post(
      "http://localhost:3001/get_most_sold_products_from_category",
      {
        cat_id,
      }
    );
    console.log(response.data);
  };

  useEffect(() => {
    GetMostSoldProducts();
  }, []);

  return (
    <div className="products_offer">
      <h1>{title}</h1>
      <div className="content">
        <div className="description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut
            sodales enim, finibus euismod felis. Proin ac luctus dui. Praesent
            suscipit convallis purus, sit amet facilisis justo posuere eu.
            Nullam non accumsan justo. Integer ante nibh, interdum a arcu eget,
            tincidunt ullamcorper est. Mauris at justo non quam commodo dictum.
            Praesent nunc justo, venenatis ut odio in, tempus eleifend est. In
            non lectus purus. Nunc eleifend tincidunt vehicula. Pellentesque eu
            facilisis arcu. Integer rhoncus scelerisque arcu gravida
            condimentum. Integer viverra rutrum ex in volutpat. Praesent
            pharetra, est vitae imperdiet tristique, urna est pulvinar sem, non
            pulvinar elit purus et odio. Nam vehicula ullamcorper augue, in
            egestas tellus sodales dapibus. Nam ut congue ligula. Donec ac magna
            leo. Nullam venenatis orci vel mi volutpat mollis. Nam tincidunt
            enim nec massa pellentesque tincidunt. Maecenas eu ligula vitae diam
            venenatis volutpat. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Donec dignissim turpis ac mauris feugiat, at
            aliquet nunc eleifend. Suspendisse ut eros ac nulla consectetur
            posuere. Nulla blandit bibendum nisi, non ultricies tortor mollis
            quis. Sed ac lorem vitae urna venenatis imperdiet eget vel mauris.
            Aenean rutrum vel ipsum non pulvinar. Suspendisse vestibulum ante
            malesuada nunc semper, ut commodo massa cursus. Praesent justo
            mauris, fermentum sed magna quis, dapibus pretium nibh. Sed magna
            felis, blandit nec urna sit amet, pretium consectetur eros. Fusce
            fermentum eleifend sem, non cursus mauris imperdiet ut. Vestibulum
            ante ipsum primis in faucibus orci luctus et ultrices posuere
            cubilia curae; Fusce vitae mollis quam. In in porttitor felis.
            Phasellus feugiat risus at turpis pretium blandit. Quisque luctus
            metus non nisl fermentum, et sagittis neque maximus. Nunc luctus
            lectus mollis metus fringilla, id pulvinar mi faucibus. Vivamus
            vitae massa condimentum, finibus neque nec, eleifend quam. Curabitur
            eget dapibus tortor, in malesuada nunc. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Donec
            ornare tellus purus, quis luctus est facilisis et. Proin posuere
            vehicula nisi ornare bibendum. Donec lacinia sed massa id ultrices.
            Mauris eu lacus dolor. Fusce nec nibh id quam tincidunt facilisis id
            at ipsum. Curabitur eget gravida tortor, luctus finibus metus. Class
            aptent taciti sociosqu ad litora torquent per conubia nostra, per
            inceptos himenaeos. Aliquam erat volutpat. Quisque vulputate rutrum
            metus sed commodo. Morbi congue molestie nulla ac ornare. Nunc vel
            risus scelerisque, blandit arcu ut, bibendum risus. Sed id nisi in
            augue ultricies posuere. Ut eleifend tortor est, sed bibendum felis
            pharetra non. Nunc sed sapien commodo, porta metus nec, ultricies
            enim. Vivamus ut metus nec velit faucibus pharetra. Nulla vel
            molestie orci. Aliquam mauris massa, tempus ut turpis at, suscipit
            sollicitudin tellus. Curabitur tincidunt dapibus felis. Duis auctor
            ac ipsum non fringilla. Donec mollis porta luctus. Nam ultricies
            nibh nec mollis cursus. Morbi ultrices, orci vitae rhoncus pretium,
            tortor mauris faucibus massa, sit amet convallis velit massa at mi.
            Donec ac rhoncus lorem, eget aliquam justo. Sed id elit dui.
          </p>
        </div>
        <div className="products">
          {products.map((prod) => (
            <ProductInOfferDisplay product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsOffer;
