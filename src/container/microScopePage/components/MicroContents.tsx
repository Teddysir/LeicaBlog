import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

interface PageButtonProps {
  $isactive: boolean;
}

const MicroContents = () => {
  const router = useRouter();
  const { category } = router.query;

  const dummyData = [
    {
      id: 1,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 2,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 3,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 4,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 5,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 6,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 7,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 8,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 9,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 10,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 11,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 12,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 13,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 14,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 15,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 16,
      imgSrc: "/img/main/middle/1.png",
      name: "김성훈 바보 김성훈 바보 김성훈 바보",
      date: "2023. 7. 6.",
    },
    {
      id: 17,
      imgSrc: "/img/main/middle/2.png",
      name: "김동균 멍청이 김동균 멍청이 김동균 멍청이",
      date: "2023. 7. 6.",
    },
  ];

  const fetchCategoryData = async () => {
    try {
      const response = await fetch(`http://52.79.95.216:8080/${category}`);
      const responseData = await response.json();
      // responseData를 가공하여 mainItems 혹은 subItems 업데이트
      // ...
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 페이지가 로드될 때와 카테고리가 변경될 때 데이터를 가져옴
  useEffect(() => {
    if (category) {
      fetchCategoryData();
    }
  }, [category]);

  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return dummyData.slice(startIndex, endIndex);
  };

  const currentItems = getPaginatedData();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

<<<<<<< HEAD
 
=======
>>>>>>> cd3452a447cb29ed3c5a7c44b78ddf7661a19c81
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div>
      <Box>
        <Wrapper>
          <MainItemWrapper>
            {currentItems.map((item) => (
              <MainItemBox key={item.id}>
                <MainItemImg>
                  <Image src={item.imgSrc} alt="" width={200} height={200} />
                </MainItemImg>
                <MainItemName>{item.name}</MainItemName>
                <MainItemDate>{item.date}</MainItemDate>
              </MainItemBox>
            ))}
          </MainItemWrapper>
        </Wrapper>
      </Box>
      <PageBoxContainer>
        <PageBox>
          <Page>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageButton
                key={index + 1}
                $isactive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
          </Page>
        </PageBox>
      </PageBoxContainer>
    </div>
  );
};

export default MicroContents;
const Box = styled.div`
  width: 966px;
  height: auto;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  margin: auto;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: auto;
  padding: 0px 15px 38px 38px;
`;

const MainItemWrapper = styled.div`
  width: 936px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
`;
const MainItemBox = styled.div`
  width: 200px;
  height: 299px;
  margin: 39px 30px 0px 0px;
`;
const MainItemImg = styled.div`
  margin-bottom: 12px;
`;
const MainItemName = styled.div`
  width: 200px;
  height: 63px;
  margin-bottom: 12px;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  font-family: "Dotum";
  cursor: pointer;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  &:hover {
    text-decoration: underline;
  }
`;

const MainItemDate = styled.div`
  width: 200px;
  height: 16.8px;
  font-size: 11px;
  font-family: "Dotum";
  color: rgb(146, 146, 146);
`;

const PageBox = styled.div`
  width: 966px;
  height: 60px;
  border: 3px solid rgb(199, 199, 199);
  border-radius: 5px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PageBoxContainer = styled.div`
  margin-top: 8px;
`;

const Page = styled.div`
  width: 926px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.button<PageButtonProps>`
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  background-color: white;
  color: ${(props) => (props.$isactive ? "#ff0000" : "black")};
  border: 2px solid ${(props) => (props.$isactive ? "#d3d3d3" : "white")};
  font-weight: ${(props) => (props.$isactive ? "600" : "400")};
  cursor: pointer;
  outline: none;
  &:hover {
    border: 2px solid #d3d3d3;
  }
`;