import React, { useState } from 'react'
import axios from 'axios';
import MovieDetailShow from './MovieDetailShow';
import dayjs from 'dayjs';

const MovieCardSearch = ({movie}) => {
    const getURL = 'http://localhost:8080/movie/getMovie'
    const [detailShow, setDetailShow] = useState(false);
    const [movieData, setMovieData] = useState([]);
    const imghandler = async (e) => {
        const id = e.target.id;
        try {
            // 常用的異步操作有：文件操作、數據庫操作、AJAX 以及定時器等。
            const res = await axios.get(`${getURL}/${id}`);
            const data = res.data.data;
            setMovieData(Array.isArray(data)? data : [data]);
            setDetailShow(true);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    }

    // 檢查 poster 是否為有效 base64字符
    // str.split(',')[1] => 取陣列中第二個元素
    // atob 解碼 base64格式字串 => btoa 對二進制資料重新編碼成base64
    const isValidBase64 = (src) => {
        if(src == 'N/A') return false;
        try {
            return btoa(atob(src.split(',')[1])).length > 0;
        } catch (error) {
            return false;
        }
    }

    const posterSrc = movie.poster ? movie.poster : 'https://via.placeholder.com/400';

    const formDate = (stringDate) => {
        return dayjs(stringDate).format('YYYY-MM-DD');
    }

    return (
    <div>
        {detailShow && (
            <MovieDetailShow 
                show = {detailShow}
                onHide={() => setDetailShow(false)}
                data={movieData}
            />
        )}
        <div className='movie'>
            <div>
                <p>{formDate(movie.releaseDate)}</p>
            </div>
            <div>
                <img id={movie.id} src={posterSrc} alt={movie.title} onClick={imghandler}/>
            </div>
            <div>
                <span>{movie.genre}</span>
                <h3>{movie.title}</h3>
            </div>
        </div>
    </div>
    )
}

export default MovieCardSearch