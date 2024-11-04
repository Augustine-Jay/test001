import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Space,
  Modal,
  Spin,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Developer } from "../types";

const { Option } = Select;

const StyledContainer = styled.div`
  padding: 2rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const fakeDevelopers: Developer[] = [
  {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    talentRank: 8.7,
    nation: "USA",
    domain: "Web Development",
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janesmith",
    talentRank: 9.2,
    nation: null,
    domain: "Machine Learning",
  },
  {
    id: "3",
    name: "Zhang Wei",
    username: "zhangwei",
    talentRank: 8.9,
    nation: "China",
    domain: "Mobile Development",
  },
  {
    id: "4",
    name: "Maria Garcia",
    username: "mariagarcia",
    talentRank: 7.8,
    nation: null,
    domain: "Data Science",
  },
  {
    id: "5",
    name: "Alex Johnson",
    username: "alexj",
    talentRank: 8.5,
    nation: "Canada",
    domain: "Web Development",
  },
];

export default function Developers() {
  const [developers, setDevelopers] = useState<Developer[]>(fakeDevelopers);
  const [filteredDevelopers, setFilteredDevelopers] =
    useState<Developer[]>(fakeDevelopers);
  const [searchText, setSearchText] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedNation, setSelectedNation] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDeveloper, setCurrentDeveloper] = useState<Developer | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    filterDevelopers();
  }, [searchText, selectedDomain, selectedNation]);

  const filterDevelopers = () => {
    let filtered = developers;
    if (searchText) {
      filtered = filtered.filter(
        (dev) =>
          dev.name.toLowerCase().includes(searchText.toLowerCase()) ||
          dev.username.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedDomain) {
      filtered = filtered.filter((dev) => dev.domain === selectedDomain);
    }
    if (selectedNation) {
      filtered = filtered.filter((dev) => dev.nation === selectedNation);
    }
    setFilteredDevelopers(filtered);
  };

  const handleGuessNation = (developer: Developer) => {
    setCurrentDeveloper(developer);
    if (developer.nation) {
      Modal.confirm({
        title: "Guess Nation",
        content: `The developer's nation is already set to ${developer.nation}. Do you want to guess anyway?`,
        onOk: () => showGuessModal(developer),
      });
    } else {
      showGuessModal(developer);
    }
  };

  const showGuessModal = (developer: Developer) => {
    setIsModalVisible(true);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const guessedNation = ["USA", "China", "India", "UK", "Germany"][
        Math.floor(Math.random() * 5)
      ];
      setCurrentDeveloper({ ...developer, nation: guessedNation });
    }, 2000);
  };

  const handleRateDeveloper = (developer: Developer) => {
    setCurrentDeveloper(developer);
    setIsModalVisible(true);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const newRank = Math.round((Math.random() * 2 + 8) * 10) / 10; // Random number between 8.0 and 10.0
      setCurrentDeveloper({ ...developer, talentRank: newRank });
    }, 2000);
  };

  const handleModalOk = () => {
    if (currentDeveloper) {
      setDevelopers((devs) =>
        devs.map((d) => (d.id === currentDeveloper.id ? currentDeveloper : d))
      );
      setFilteredDevelopers((devs) =>
        devs.map((d) => (d.id === currentDeveloper.id ? currentDeveloper : d))
      );
      message.success("Developer information updated successfully");
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Developer, b: Developer) => a.name.localeCompare(b.name),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "TalentRank",
      dataIndex: "talentRank",
      key: "talentRank",
      sorter: (a: Developer, b: Developer) => a.talentRank - b.talentRank,
      render: (talentRank: number) => talentRank.toFixed(1),
    },
    {
      title: "Nation",
      dataIndex: "nation",
      key: "nation",
      render: (nation: string | null) => nation || "N/A",
    },
    {
      title: "Domain",
      dataIndex: "domain",
      key: "domain",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Developer) => (
        <Space>
          <Button onClick={() => handleGuessNation(record)}>
            Guess Nation
          </Button>
          <Button onClick={() => handleRateDeveloper(record)}>Rate</Button>
        </Space>
      ),
    },
  ];

  return (
    <StyledContainer>
      <StyledHeader>
        <Input
          placeholder="Search developers"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Space>
          <Select
            style={{ width: 200 }}
            placeholder="Select Domain"
            value={selectedDomain}
            onChange={setSelectedDomain}
          >
            <Option value="">All Domains</Option>
            <Option value="Web Development">Web Development</Option>
            <Option value="Machine Learning">Machine Learning</Option>
            <Option value="Mobile Development">Mobile Development</Option>
            <Option value="Data Science">Data Science</Option>
          </Select>
          <Select
            style={{ width: 200 }}
            placeholder="Select Nation"
            value={selectedNation}
            onChange={setSelectedNation}
          >
            <Option value="">All Nations</Option>
            <Option value="USA">USA</Option>
            <Option value="China">China</Option>
            <Option value="Canada">Canada</Option>
          </Select>
        </Space>
      </StyledHeader>
      <Table columns={columns} dataSource={filteredDevelopers} rowKey="id" />
      <Modal
        title={isLoading ? "Processing..." : "Result"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
            <p>Please wait while we process the information...</p>
          </div>
        ) : (
          currentDeveloper && (
            <div>
              <p>Name: {currentDeveloper.name}</p>
              <p>Username: {currentDeveloper.username}</p>
              <p>TalentRank: {currentDeveloper.talentRank.toFixed(1)}</p>
              <p>Nation: {currentDeveloper.nation || "N/A"}</p>
              <p>Domain: {currentDeveloper.domain}</p>
            </div>
          )
        )}
      </Modal>
    </StyledContainer>
  );
}
