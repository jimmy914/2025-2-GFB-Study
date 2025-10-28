import { useState } from 'react'
import './App.css'

function App() {


  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
  let [발행일자, 발행일자변경] = useState(['2월 17일 발행', '2월 18일 발행', '2월 19일 발행']);
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');


  const sortTitle = () => {
    let copy = [...글제목];
    copy.sort();
    글제목변경(copy);
  };


  const editTitle = () => {
    let copy = [...글제목];
    copy[0] = '여자코트 추천';
    글제목변경(copy);
  };


  const publishPost = () => {
    if (입력값.trim() === '') return alert('내용을 입력하세요!');
    let titleCopy = [입력값, ...글제목];
    let dateCopy = ['3월 1일 발행', ...발행일자];
    let likeCopy = [0, ...따봉];
    글제목변경(titleCopy);
    발행일자변경(dateCopy);
    따봉변경(likeCopy);
    입력값변경('');
  };

  const deletePost = (i) => {
    let titleCopy = [...글제목];
    let dateCopy = [...발행일자];
    let likeCopy = [...따봉];
    titleCopy.splice(i, 1);
    dateCopy.splice(i, 1);
    likeCopy.splice(i, 1);
    글제목변경(titleCopy);
    발행일자변경(dateCopy);
    따봉변경(likeCopy);
  };

  return (
    <div className="App">

      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>


      <div style={{ margin: '10px 0' }}>
        <button onClick={sortTitle}>가나다순 정렬</button>
        <button onClick={editTitle}>첫 글 수정</button>
      </div>


      <div style={{ marginBottom: '20px' }}>
        <input 
          value={입력값} 
          onChange={(e) => 입력값변경(e.target.value)} 
          placeholder="새 글 제목을 입력하세요"
        />
        <button onClick={publishPost}>글 발행</button>
      </div>

      {
        글제목.map((a, i) => {
          return (
            <div className='list' key={i}>
              <h4 onClick={() => { setModal(!modal); setTitle(i); }}>
                {글제목[i]} 
                <span 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    let copy = [...따봉];
                    copy[i] = copy[i] + 1;
                    따봉변경(copy);
                  }}
                > 👍 </span> {따봉[i]}
              </h4>
              <p>{발행일자[i]}</p>
              <button onClick={() => deletePost(i)}>삭제</button>
            </div>
          )
        })
      }

      {
        modal === true 
          ? <Modal 
              title={title} 
              글제목={글제목} 
              글제목변경={글제목변경} 
            /> 
          : null
      }

    </div>
  )
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜: 2월 17일</p>
      <p>상세내용: 리액트는 진짜 재밌다 😎</p>
      <button 
        onClick={() => {
          let copy = [...props.글제목];
          copy[props.title] = '여자코트 추천';
          props.글제목변경(copy);
        }}
      >
        글 수정
      </button>
    </div>
  );
}

export default App;
