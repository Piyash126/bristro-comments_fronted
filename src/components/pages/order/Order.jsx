import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import orderCover from "../../../assets/shop/order.jpg";
import useMenu from "../../hooks/useMenu";
import Cover from "../../shared/cover/Cover";
import OrderTab from "./orderTab/OrderTab";

const Order = () => {
  const categories = ["offered", "salad", "pizza", "dessert", "soup", "drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);

  //   const [tabIndex, setTabIndex] = useState(0);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const [menu] = useMenu();
  //   console.log(category);
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  const drinks = menu.filter((item) => item.category === "drinks");
  return (
    <div>
      <Helmet>
        <title>Bistro || Order</title>
      </Helmet>
      <Cover img={orderCover} title="order food"></Cover>
      {/* <Tabs defaultIndex={1} onSelect={(index) => console.log(index)}> */}
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Offered</Tab>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Desserts</Tab>
          <Tab>Soup</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={offered}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
