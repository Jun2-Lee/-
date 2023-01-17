import React, { useState, useRef } from "react";
import $ from "jquery";
import './index.css';

export default function AddressSelect() { 
    function optionChange() {
        //var area0 = ["시/도 선택","중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"];
        var area1 = ["중앙동","동광동","보수동","대청동","부평동","광복동","남포동", "영주동"];
        var area2 = ["동대신동", "서대신동", "부민동", "아미동", "초장동", "충무동", "남부민동", "암남동"];
        var area3 = ["초량동", "수정동", "좌천동", "범일동"];
        var area4 = ["남항동", "영선동", "신선동", "봉래동", "청학동", "동삼동"];
        var area5 = ["가야동", "개금동", "당감동", "범전동", "범천동", "부암동", "부전동", "양정동", "연지동", "전포동", "초읍동"];
        var area6 = ["낙민동", "명륜동", "명장동", "복천동", "사직동", "수안동", "안락동", "온천동", "칠산동"];
        var area7 = ["감만동", "대연동", "문현동", "용당동", "용호동", "우암동"];
        var area8 = ["구포동", "금곡동", "덕천동", "만덕동", "화명동"];
        var area9 = ["반송동", "반여동", "석대동", "송정동", "우동", "재송동", "좌동", "중동"];
        var area10 = ["감천동", "괴정동", "구평동", "다대동", "당리동", "신평동", "장림동", "하단동"];
        var area11 = ["구서동", "금사동", "회동동", "금성동", "남산동", "노포동", "두구동", "부곡동", "서동", "선동", "오륜동", "장전동", "청룡동"];
        var area12 = ["대저동", "강동동", "명지동", "죽림동", "식만동", "죽동동", "봉림동", "송정동", "화전동", "녹산동", "생곡동", "구랑동", "지사동", "미음동", "범방동", "신호동", "동선동", "성북동", "눌차동", "천성동", "대항동"];
        var area13 = ["거제동", "연산동"];
        var area14 = ["광안동", "남천동", "망미동", "민락동", "수영동"];
        var area15 = ["감전동", "괘법동", "덕포동", "모라동", "삼락동", "엄궁동", "주례동", "학장동"];
        var area16 = ["기장읍", "장안읍", "정관읍", "일광읍", "철마면"];

        var v = $( '#gu' ).val();
        var o;

        if ( v == '중구' ) {
          o = area1;
        } else if ( v == '서구' ) {
          o = area2;
        } else if ( v == '동구' ) {
            o = area3;
        } else if ( v == '영도구' ) {
            o = area4;
        } else if ( v == '부산진구' ) {
            o = area5;
        } else if ( v == '동래구' ) {
            o = area6;
        } else if ( v == '남구' ) {
            o = area7;
        } else if ( v == '북구' ) {
            o = area8;
        } else if ( v == '해운대구' ) {
            o = area9;
        } else if ( v == '사하구' ) {
            o = area10;
        } else if ( v == '금정구' ) {
            o = area11;
        } else if ( v == '강서구' ) {
            o = area12;
        } else if ( v == '연제구' ) {
            o = area13;
        } else if ( v == '수영구' ) {
            o = area14;
        } else if ( v == '사상구' ) {
            o = area15;
        } else if ( v == '기장군' ) {
            o = area16;
        } else {
          o = [];
        }

        $( '#dong' ).empty();
        //$( '#dong' ).append( '<option>동</option>' );
        for ( var i = 0; i < o.length; i++ ) {
          $( '#dong' ).append( '<option value="o[i]">' + o[ i ] + '</option>' );
        }
      }

    return(
        <div>
            <select id="gu" onChange={optionChange}>
                <option>구</option>
                <option value="중구">중구</option>
                <option value="서구">서구</option>
                <option value="동구">동구</option>
                <option value="영도구">영도구</option>
                <option value="부산진구">부산진구</option>
                <option value="동래구">동래구</option>
                <option value="남구">남구</option>
                <option value="북구">북구</option>
                <option value="해운대구">해운대구</option>
                <option value="사하구">사하구</option>
                <option value="금정구">금정구</option>
                <option value="강서구">강서구</option>
                <option value="연제구">연제구</option>
                <option value="수영구">수영구</option>
                <option value="사상구">사상구</option>
                <option value="기장군">기장군</option>
            </select>
            <select id="dong">
                <option>동</option>
            </select>
        </div>
    );
}
