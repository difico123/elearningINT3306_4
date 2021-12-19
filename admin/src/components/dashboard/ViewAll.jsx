import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import AdminService from '../../service/AdminService';
import { PieChart, Pie, Tooltip, ComposedChart, XAxis, YAxis, Legend, CartesianGrid, Bar, Cell, Line } from "recharts";

function ViewAll() {
    const [getAll, setAll] = useState([
        {
            users: '',
            courses: '',
            students: '',
            instructors: ''
        },
    ]);

    const [change, setChange] = useState(false);

    useEffect(() => {
        AdminService.getAll().then((response) => {
            setAll(response.statistic);
            console.log(response.statistic)
        });
    }, [change]);

    const data = [
        { name: "User", value: getAll.users },
        { name: "Courses", value: getAll.courses },
        { name: "Student", value: getAll.students },
        { name: "Instructors", value: getAll.instructors }
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <>
            <Title>Thống kê E-learning</Title>
            <Wrap>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#039be5"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                <ComposedChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" scale="band" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </ComposedChart>
            </Wrap>
        </>
    )
}

export default ViewAll

const Wrap = styled.div`
display: flex; 
flex-nowrap: wrap;
background: white;
height: 80%;
text-align: center;
justify-content: space-around;
padding-top: 100px;
`

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  background-color: #eee;
`;