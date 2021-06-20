import React, {useEffect, useState} from "react"
import ReactDOM from "react-dom"

const NewsList = ({article}) => {
    return (
        <ul>
            {
                article.map((article, idx) => {
                    return (<li key={idx}>
                        <NewsItem article={article} />
                    </li>)
                })
            }
        </ul>
    )
}

const NewsItem = (props) => {
    const {title, description, url, urlToImage} = props.article
    return (
        <div>
            <h3><a href={url}>{title}</a></h3>
            <img src={urlToImage} style={{height:'100px'}}/>
            <p>{description}</p>
        </div>
    )
}

const Search = ({label, handleSearch}) => {
    const [keyword, setKeyword] = useState('')
    return (
        <div>
            <input type="text"
            value = {keyword}
                   onChange={(e) => {
                       setKeyword(e.target.value)
                   }}
            />
            <button onClick={()=>{
                const k = keyword.trim()
                if(k.length === 0){
                    alert('검색어를 정확히 입력해주세요.')
                }else{
                    handleSearch(k)
                }

            }}>{label ?? "검색"}</button>
            {/*값이 없을 때는 검색이라 써지고 있을 때는 label값을 띄워줌*/}
        </div>
    )
}

const NewsApp = () => {
    const [query, setQuery] = useState(null)
    const apiKey = '533fe6a6d47847a8a61a319da2c18efb'
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(query){
            fetch(`http://newsapi.org/v2/everything?apiKey=${apiKey}&q=${query}`)
                .then(res => res.json())
                .then(data => {
                    // 데이터 설정 및 로딩 상태 갱신
                    setArticles(data.articles)
                    setLoading(false)
                })
        }
    }, [query])

    return (
        <div>
            <Search handleSearch={setQuery}/>
            <NewsList article={articles} />
        </div>
    )
}

ReactDOM.render(<NewsApp />, document.getElementById("root"))