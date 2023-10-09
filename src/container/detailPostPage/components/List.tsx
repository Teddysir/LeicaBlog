  import { useSearchBoard } from "@/hooks/pagenateHook/usePagenate";
  import { Router, useRouter } from "next/router";
  import React, { useState, useEffect, use } from "react";
  import styled from "styled-components";
  import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

  interface ListWrapperProps {
    $expanded: boolean;
  }
  interface Post {
    id: number;
    title: string;
    subTitle: string;
    content: string;
    thumbnail: string;
    writer: string;
    category: string;
    parentCategory: string;
  }
  interface ResponseDataItem {
    totalElement: number;
    lastPage: boolean;
    totalPage: number;
    childList: any[];
  }
  interface PageButtonProps {
    $isactive: boolean;
  }
  const ContentsList: React.FC = () => {
    const [showList, setShowList] = useState<boolean>(true);
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState<Post | null>(null);
    const [childrenPost, setChildrenPost] = useState<ResponseDataItem | null>(
      null
    );
    const [pageItems, setPageItems] = useState<ResponseDataItem>({
      totalElement: 0, // totalElement로 바뀔예정
      lastPage: false,
      totalPage: 1,
      childList: [],
    });
    const page = Number(router.query.page) || 1;

    const toggleList = () => {
      setShowList((prevState) => !prevState);
    };

    useEffect(() => {
      if (id) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/find/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setPost(data);
          })
          .catch((error) => {
            console.error("게시물을 가져오는 중 오류 발생:", error);
          });
      }
    }, [id]);

    useEffect(() => {
      if (id && post) {
        const { parentCategory, category } = post;
        fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          
          }/post/${parentCategory}/${category}?size=5&page=${page-1}`
        )
          .then((response) => response.json())
          .then((data) => {
            setChildrenPost(data);
            setPageItems(data);
          })
          .catch((error) => {
            console.error("자식 카테고리 게시물을 가져오는 중 오류 발생:", error);
          });
      }
    }, [id, page, post]);

    const {
      currentPage,
      handlePageChange,
      pages,
      handleNextGroup,
      handlePrevGroup,
      lastPageGroup,
      pageGroups,
    } = useSearchBoard({
      apiData: pageItems,
    });

    const handleTitleClick = (postId: number) => {
      router.push({
        query: { id: postId },
      });
    };

    return (
      <>
        <ListWrapper $expanded={showList}>
          <ListTitleBox>
            {post ? (
              <>
                <ListTitle>{post.parentCategory} - {post.category}</ListTitle>
                <ListAmount>{childrenPost?.totalElement || 0}개의 글</ListAmount>
              </>
            ) : (
              <div>Loading...</div>
            )}
            <ListToggleBtn onClick={toggleList}>
              {showList ? "목록닫기" : "목록열기"}
            </ListToggleBtn>
          </ListTitleBox>
          {showList && (
            <ListContents>
              <ContentsTitleBox>
                <ContentsTitleSpan>글 제목</ContentsTitleSpan>
                <ContentsAmountSpan>작성일</ContentsAmountSpan>
              </ContentsTitleBox>
              {pageItems ? (
                pageItems.childList.map((post: any) => (
                  <ContentBox
                    key={post.id}
                    onClick={() => handleTitleClick(post.id)}
                  >
                    <CategoryTitle>{post.title}</CategoryTitle>
                    <CategoryAmount>{post.createdAt}</CategoryAmount>
                  </ContentBox>
                ))
              ) : (
                <div>Loading...</div>
              )}

              <Page>
                {pageGroups !== 0 && (
                  <div
                    onClick={() => {
                      handlePrevGroup(pageGroups);
                    }}
                  >
                    <span>이전</span>
                    <BiSolidLeftArrow size="5" />
                  </div>
                )}
                {pages ? (
                  pages.map((item: number) => (
                    <PageButton
                      key={item}
                      $isactive={currentPage === item}
                      onClick={() => handlePageChange(item)}
                      value={currentPage}
                    >
                      {item}
                    </PageButton>
                  ))
                ) : (
                  <></>
                )}
                {pageGroups !== lastPageGroup && (
                  <div
                    onClick={() => {
                      handleNextGroup(pageGroups);
                    }}
                  >
                    <span>다음</span>
                    <BiSolidRightArrow size="5" />
                  </div>
                )}
              </Page>
            </ListContents>
          )}
        </ListWrapper>
      </>
    );
  };

  export default ContentsList;

  const ListWrapper = styled.div<ListWrapperProps>`
    width: 966px;
    margin: auto;
    border: 3px solid rgb(199, 199, 199);
    border-radius: 5px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 8px;
    overflow: hidden;
  `;

  const ListTitleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0px 5px 0px;
  `;

  const ListTitle = styled.div`
    font-size: 13px;
    font-weight: 600;
    align-items: center;
    margin-right: 5px;
  `;

  const ListAmount = styled.div`
    font-size: 13px;
    align-items: center;
  `;

  const ListToggleBtn = styled.div`
    font-size: 13px;
    height: 17.6px;
    margin-left: auto;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `;

  const ListContents = styled.div``;

  const ContentsTitleBox = styled.div`
    width: 936px;
    height: 32px;
    display: flex;
    align-items: center;
    padding-top: 10px;
    border-bottom: 1px solid;
    border-color: rgb(146, 146, 146);
  `;
  const ContentsTitleSpan = styled.div`
    height: 20px;
    margin: 6px 0px 6px 0px;
    font-size: 12px;
    align-items: center;
    color: rgb(146, 146, 146);
  `;
  const ContentsAmountSpan = styled.div`
    margin-left: 855px;
    font-size: 12px;
    padding: 6px 0px 6px 0px;
    color: rgb(146, 146, 146);
  `;

  const ContentBox = styled.div`
    width: 936px;
    height: 36px;
    border-bottom: 1px solid;
    border-color: rgb(223, 223, 223);
    align-items: center;
    display: flex;
  `;

  const CategoryTitle = styled.div`
    width: 895px;
    font-size: 12px;
    font: 나눔고딕;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  `;

  const CategoryAmount = styled.div`
    margin-left: 0px;
    font-size: 12px;
    color: rgb(146, 146, 146);
  `;

  const Page = styled.div`
    width: 926px;
    height: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
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
