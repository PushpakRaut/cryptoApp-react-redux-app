import React,{ useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptoCoinsQuery } from "../services/cryptoApi";
import Loader from "./Loader";

import demoImage from "../images/demo.jpg"

const { Text, Title } = Typography;
const { Option } = Select;



const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptoCoinsQuery(100);
  const { data: cryptoNewsList } = useGetCryptoNewsQuery({
    newsCategory
  });
  
  if (!cryptoNewsList?.data) return <Loader />;
  
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((coin) => (
              <Option value={coin.name} key={coin.uuid}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {(simplified ? cryptoNewsList.data.slice(1, 7) : cryptoNewsList.data ).map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title level={4} className="news-title">
                  {news.title}
                </Title>
                <img
                  style={{ maxWidth: "100px", maxHeight: "100px", objectFit: "contain" }}
                  src={news?.thumbnail || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news.source.favicon || demoImage}
                    alt="news"
                  />
                  <Text className="provider-name">
                    {news.source.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.date).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
