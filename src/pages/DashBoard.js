import CustomChart from '../components/CustomChart';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver';

const DashBoard = () => {
    const path = "http://greenlibrary.somee.com/api/";
    // const path = "https://localhost:44366/api/";
    const [borrowMonths, SetBorrowMonths] = useState([])
    const [dataBorrows, SetDataBorrows] = useState([])
    const [monthBorrows, SetMonthBorrows] = useState([])
    const [books, SetBooks] = useState([])
    const [bookDatas, SetBookDatas] = useState([])
    const [bookLabels, SetBookLabels] = useState([])
    const fetchData = async () => {
        try {
          const [borrowMonthsResponse, bookReportsResponse] = await Promise.all([
            axios.get(path + 'Report/GetBorrowMonths?month=4'),
            axios.get(path + 'Report/GetBookReports')
          ]);
      
          SetDataChart(borrowMonthsResponse.data);
          SetBooks(bookReportsResponse.data);
          SetBookChart(bookReportsResponse.data);
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        fetchData();
      }, []);
      
    const SetDataChart = (list) => {
        let months = []
        let borrows = []
        for (let i = 0; i < list.length; i++) {
            months.push(list[i].month + "/" + list[i].year)
            borrows.push(list[i].number)
        }
        SetDataBorrows(borrows);
        SetMonthBorrows(months);
    }
    const SetBookChart = (list) => {
        let labels = []
        let datas = []
        for (let i = 0; i < list.length; i++) {
            labels.push(list[i].title)
            datas.push(list[i].borrowNumber)
        }
        SetBookDatas(datas);
        SetBookLabels(labels);
    }
    const handleDownload = () => {
        axios
            .post(path + 'Report/ExportExcel', books, { responseType: 'blob' })
            .then((response) => {
                console.log(response.data);
                const file = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                saveAs(file, 'books.xlsx');
            })

            .catch((error) => {
                console.error('Error downloading file:', error);
            });
    };
    return (
        <>
            <h4 class="title">Tổng quan</h4>
            <div class="row">
                <div class="col-10 col-s-12">
                    <div class="box box-primary">
                        <div class="box-header">
                            <h3 class="box-title">Lượt mượn sách</h3>
                        </div>
                        <div class="box-body">
                            <CustomChart type="Line" datas={dataBorrows} labels={monthBorrows} label="Lượt mượn sách theo tháng"></CustomChart>
                        </div>
                    </div>

                </div>
                <div class="col-10 col-s-12">
                    <div class="box box-info">
                        <div class="box-header">
                            <h3 class="box-title">Lượt truy cập</h3>
                        </div>
                        <div class="box-body">
                            <CustomChart type="Bar" datas={bookDatas} labels={bookLabels} label="Lượt mượn theo đầu sách"></CustomChart>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <button className="btn" onClick={handleDownload}>Xuất báo cáo</button>
                </div>
            </div>

        </>
    )
}
export default DashBoard