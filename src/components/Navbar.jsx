import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import icon from "../images/cryptocurrency.png";

const Navbar = ({ current, setCurrent }) => {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(()=>{
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  },[])

  useEffect(() => {
    if(screenSize < 768){
      setActiveMenu(false);
    }else{
      setActiveMenu(true);
    }
  }, [screenSize])
  

  const items = [
    { label: "Home", key: "/", icon: <HomeOutlined /> },
    {
      label: "Cryptocurrencies",
      key: "/cryptocurrencies",
      icon: <FundOutlined />,
    },
    { label: "News", key: "/news", icon: <BulbOutlined /> },
  ];
  const onClickMenuItem = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const onClickGoHome = () => {
    navigate("/");
    setCurrent("/");
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        {/* <Typography.Title level={2} className="logo">
          <Link to="/">CryptoAPP</Link>
        </Typography.Title> */}
        <Typography.Title
          level={2}
          className="logo"
          style={{ color: "white", cursor: "pointer" }}
          onClick={onClickGoHome}
        >
          CryptoAPP
        </Typography.Title>
        <Button className="menu-control-container" onClick={()=>setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </Button>
      </div>
      {/* <Menu theme="dark" items={items} mode="verticle">
        <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchange">Exchange</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
        </Menu.Item>
      </Menu> */}
      {/* <br /> */}
      {activeMenu && (
      <Menu
      onClick={onClickMenuItem}
      defaultOpenKeys={["/"]}
      selectedKeys={[current]}
      mode="vertical"
      theme="dark"
      items={items}
    ></Menu>
      )}
    </div>
  );
};

export default Navbar;
