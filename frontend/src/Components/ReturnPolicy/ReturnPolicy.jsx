import React from "react";
import "./Returnpolicy.css";
import Helmet from "react-helmet";

const ReturnPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Our Return Policy</title>
      </Helmet>
      <div className="return_container">
        <h2 style={{ textAlign: "center" }}>Returns Policy</h2>
        <h5>
          Returns is a scheme provided by respective sellers directly under this
          policy in terms of which the option of exchange, replacement and/ or
          refund is offered by the respective sellers to you. All products
          listed under a particular category may not have the same returns
          policy. For all products, the returns/replacement policy provided on
          the product page shall prevail over the general returns policy. Do
          refer the respective item's applicable return/replacement policy on
          the product page for any exceptions to this returns policy and the
          table below
        </h5>
        <br />
        <h5>
          The return policy is divided into three parts; Do read all sections
          carefully to understand the conditions and cases under which returns
          will be accepted.
        </h5>
        <br />
        <h5>Part 1 – Category, Return Window and Actions possible</h5>

        <table>
          <tr>
            <th>Category</th>
            <th>Returns Window, Actions Possible and Conditions (if any)</th>
          </tr>
          <tr>
            <td>
              Lifestyle: Jewellery, Footwear Accessories, Travel Accessories,
              Watch Accessories, etc.. Home: Pet Supplies & Rest of Home.
              (Except Home décor, Furnishing, Home Improvement Tools, Household
              Items)
            </td>
            <td>10 days Refund or Replacement</td>
          </tr>

          <tr>
            <td>
              Lifestyle: Watch, Winter Wear (Blazer, Sweatshirt, Scarf, Shawl,
              Jacket, Coat, Sweater, Thermal, Kid’s Thermal, Track Pant,
              Shrugs), etc...
            </td>
            <td>10 days Refund, Replacement or Exchange</td>
          </tr>

          <tr>
            <td>
              Lifestyle: T-Shirt, Footwear, Sari, Short, Dress, Kid’s (Capri,
              Shorts & Tops), Men’s (Ethnic Wear, Shirt, Formals, Jeans,
              Clothing Accessory), Women’s (Ethnic Wear, Fabric, Blouse, Jean,
              Skirt, Trousers, Bra), Bags, Raincoat, Sunglass, Belt, Frame,
              Backpack, Suitcase, Luggage, etc...
            </td>
            <td>14 days Refund, Replacement or Exchange</td>
          </tr>
        </table>
        <br />

        <h5>
          The field executive will refuse to accept the return if any of the
          above conditions are not met.
        </h5>
        <br />

        <h5>
          For any products for which a refund is to be given, the refund will be
          processed once the returned product has been received by the seller.
        </h5>
        <br />

        <h5>Part 2 - General Rules for a successful Return</h5>
        <ul>
          <li>
            In certain cases where the seller is unable to process a replacement
            for any reason whatsoever, a refund will be given.
          </li>

          <li>
            In cases where a product accessory is found
            missing/damaged/defective, the seller may either process a
            replacement of the particular accessory or issue an eGV for an
            amount equivalent to the price of the accessory, at the seller’s
            discretion.
          </li>

          <li>
            During open box deliveries, while accepting your order, if you
            received a different or a damaged product, you will be given a
            refund (on the spot refunds for cash-on-delivery orders). Once you
            have accepted an open box delivery, no return request will be
            processed, except for manufacturing defects. In such cases, these
            category-specific replacement/return general conditions will be
            applicable. Click here to know more about Open Box Delivery
          </li>
        </ul>

        <h5>
          'In case the product was not delivered and you received a delivery
          confirmation email/SMS, report the issue within 7 days from the date
          of delivery confirmation for the seller to investigate.'
        </h5>
      </div>
    </>
  );
};

export default ReturnPolicy;
