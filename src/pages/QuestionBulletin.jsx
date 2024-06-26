import QuestionSearch from 'components/QuestionSearch';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const QuestionBulletin = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await axios.get('http://localhost:8080/posts');
        setBoard(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBoard();
  }, []);

  const filteredBoard = board.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <QuestionLayout>
      <QuestionBox>
        <QuestionImage src="/images/leftArrow.png" onClick={() => navigate(-1)} />
        <QuestionText>질문 게시판</QuestionText>
        <Link to={'/write'}>
          <QustionButtonBox>
            <QuestionButtonImage src="/images/pencil.png" />
            <QuestionButton>질문하기</QuestionButton>
          </QustionButtonBox>
        </Link>
      </QuestionBox>

      <QuestionSearch setSearchTerm={setSearchTerm} />
      {filteredBoard.map((item) => {
        return (
          <Link to={`/questionDetail/${item.id}`} key={item.id}>
            <QuestionList>
              <QustionTitle>{item.title}</QustionTitle>
              <QuestionItem>
                <QusitonLeft>
                  <QuestionContent dangerouslySetInnerHTML={{ __html: item.content }} />
                </QusitonLeft>
                <QuestionRight>
                  <div>{item.author.nickname}</div>
                  <QustionTime>{item.createdAt?.replace('T', ' ')}</QustionTime>
                  <img src="/images/comment.png" />
                  <QustionComment>{item.comments ? item.comments.length : 0}</QustionComment>
                </QuestionRight>
              </QuestionItem>
              <Hr />
            </QuestionList>
          </Link>
        );
      })}
    </QuestionLayout>
  );
};

export default QuestionBulletin;

const QuestionLayout = styled.div`
  padding: 0 250px 180px 250px;
  background-color: white;
`;
const QuestionBox = styled.div`
  display: flex;
  align-items: center;
`;

const QuestionImage = styled.img`
  object-fit: cover;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;
const QuestionText = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-right: 10px;
`;

const QustionButtonBox = styled.div`
  position: absolute;
  right: 15.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3b64e6;
  border-radius: 5px;
  width: 125px;
  height: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #233f9a;
  }
`;
const QuestionButton = styled.span`
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin-left: 5px;
  cursor: pointer;
  a:link {
    color: #ffffff;
  }
  a:visited {
    color: #ffffff;
  }
`;
const QuestionButtonImage = styled.img`
  width: 25px;
  height: 25px;
`;

const QuestionList = styled.ul`
  margin-left: 30px;
  margin-top: 1.5rem;
  cursor: pointer;
`;
const QuestionItem = styled.li`
  display: flex;
  justify-content: space-between;
  color: #8b8b8b;
  font-size: 16px;
`;
const QusitonLeft = styled.div``;
const QuestionRight = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  img {
    height: 19px;
  }
`;

const QustionTitle = styled.div`
  color: #464646;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 13px;
`;

const QuestionContent = styled.div`
  height: 1rem;
  white-space: nowrap; // 한줄로만
  overflow: hidden;
  text-overflow: ellipsis; // 넘치면 ... 표시
`;
const QustionTime = styled.div`
  margin: 0 0.7rem;
`;
const QustionComment = styled.div``;
const Hr = styled.hr`
  border: 0;
  border: 1px solid #dfdfdf;
  margin-top: 1.5rem;
`;
