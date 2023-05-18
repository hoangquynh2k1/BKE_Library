import React, { Component } from 'react'

function Home()
{
        return (

            <>
                <h4 class="title">Tổng quan</h4>
                <div class="row">
                    <div class="col-6 col-s-12">
                        <div class="box box-primary">
                            <div class="box-header">
                                <h3 class="box-title">Lượt mượn sách</h3>
                            </div>
                            <div class="box-body">
                                <canvas id="areaChart" height="250"></canvas>
                            </div>
                        </div>
                        <div class="box box-success">
                            <div class="box-header">
                                <h3 class="box-title">Doanh thu</h3>
                            </div>
                            <div class="box-body">
                                <canvas id="barChart" height="230"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-s-12">

                        <div class="box box-info">
                            <div class="box-header">
                                <h3 class="box-title">Lượt truy cập</h3>
                            </div>
                            <div class="box-body">
                                <canvas id="lineChart" height="250"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}

export default Home