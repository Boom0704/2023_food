import img_1 from './img/1.jpeg';
import "./css/Category.css";

function Category( {foodType} ) {
  const data =  
  [
    {
      id : 0,
      title : "오목돈 고기 맛있어",
      content : "나 오목돈 몇달 ,, ㅠ ",
      like : 921,
      view : 1200,
      writer : "땅니",
      date : "2023-04-14",
      food : "한식"
    },
    {
      id : 1,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니1",
      date : "2023-04-14",
      food : "한식"
    },
    {
      id : 2,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니2",
      date : "2023-04-14",
      food : "한식"
    },
    {
      id : 3, 
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니3",
      date : "2023-04-14",
      food : "한식"
    },    
    {
      id : 4,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니4",
      date : "2023-04-14",
      food : "한식"
    },    
    {
      id : 4,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니4",
      date : "2023-04-14",
      food : "한식"
    },    
    {
      id : 4,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니4",
      date : "2023-04-14",
      food : "한식"
    },    
    {
      id : 4,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니4",
      date : "2023-04-14",
      food : "한식"
    },    
    {
      id : 4,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니4",
      date : "2023-04-14",
      food : "한식"
    },    
    {
      id : 4,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니4",
      date : "2023-04-14",
      food : "한식"
    },    
    {
      id : 4,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니4",
      date : "2023-04-14",
      food : "한식"
    },    
    {
      id : 4,
      title : "고기 맛있어",
      content : "나  옷 갖고 시펑 ,, ㅠ ",
      like : 21,
      view : 120,
      writer : "땅니4",
      date : "2023-04-14",
      food : "한식"
    }
] 

  return (
      <div>
        <div>음식 종류 : {foodType}</div>
        {data.map(x => <Writing_Card info = {x}/> )}
        <div> PAGE 번호 </div>
        <div>
          <button>글쓰기</button>
        </div>
      </div>
    );
  }

  function Writing_Card( {info} ) {
    return (
      <div className='card'>
        <img className='preview_img' src={img_1} />
        <h2>{info.title}</h2>
        <p>{info.content}</p>
        <div className='profile__like__view'>
          <img className='user_profile_img' src={img_1} />
          <div className='icon_like'>
            <span>icon/like</span>
            <span>99</span>
          </div>
          <div className='icon_view'>
            <span>icon/view</span>
            <span>10</span>
          </div>
        </div>
      </div>
    );
  }
  
  export default Category;
  