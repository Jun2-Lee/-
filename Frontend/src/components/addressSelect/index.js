import { useState, useEffect } from 'react';
import './index.css'

const regions = {
    '중구': ["중앙동","동광동","보수동","대청동","부평동","광복동","남포동", "영주동"],
    '서구': ["동대신동", "서대신동", "부민동", "아미동", "초장동", "충무동", "남부민동", "암남동"],
    '동구': ["초량동", "수정동", "좌천동", "범일동"],
    '영도구': ["남항동", "영선동", "신선동", "봉래동", "청학동", "동삼동"],
    '부산진구': ["가야동", "개금동", "당감동", "범전동", "범천동", "부암동", "부전동", "양정동", "연지동", "전포동", "초읍동"],
    '동래구': ["낙민동", "명륜동", "명장동", "복천동", "사직동", "수안동", "안락동", "온천동", "칠산동"],
    '남구': ["감만동", "대연동", "문현동", "용당동", "용호동", "우암동"],
    '북구': ["구포동", "금곡동", "덕천동", "만덕동", "화명동"],
    '해운대구': ["반송동", "반여동", "석대동", "송정동", "우동", "재송동", "좌동", "중동"],
    '사하구': ["감천동", "괴정동", "구평동", "다대동", "당리동", "신평동", "장림동", "하단동"],
    '금정구': ["구서동", "금사동", "회동동", "금성동", "남산동", "노포동", "두구동", "부곡동", "서동", "선동", "오륜동", "장전동", "청룡동"],
    '강서구': ["대저동", "강동동", "명지동", "죽림동", "식만동", "죽동동", "봉림동", "송정동", "화전동", "녹산동", "생곡동", "구랑동", "지사동", "미음동", "범방동", "신호동", "동선동", "성북동", "눌차동", "천성동", "대항동"],
    '연제구': ["거제동", "연산동"],
    '수영구': ["광안동", "남천동", "망미동", "민락동", "수영동"],
    '사상구': ["감전동", "괘법동", "덕포동", "모라동", "삼락동", "엄궁동", "주례동", "학장동"],
    '기장군': ["기장읍", "장안읍", "정관읍", "일광읍", "철마면"]
};

function AddressSelect({onSelectedGu, onSelectedDong}) {
    const [selectedGu, setSelectedGu] = useState('');
    const [selectedDong, setSelectedDong] = useState('');

    function handleGuChange(event) {
        setSelectedGu(event.target.value);
        setSelectedDong('');
        onSelectedGu(event.target.value);
    }

    function handleDongChange(event) {
        setSelectedDong(event.target.value);
        onSelectedDong(event.target.value);
    }

    return (
    <div>
        <select id="gu" value={selectedGu} onChange={handleGuChange}>
            <option value="">구</option>
            {Object.keys(regions).map((Gu) => (
                <option key={Gu} value={Gu}>{Gu}</option>
            ))}
        </select>

        <select id="dong" value={selectedDong} onChange={handleDongChange} disabled={!selectedGu}>
            <option value="">동</option>
            {regions[selectedGu] && regions[selectedGu].map((Dong) => (
                <option key={Dong} value={Dong}>{Dong}</option>
            ))}
        </select>
    </div>
    );
}

export default AddressSelect;

