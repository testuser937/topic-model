import React, {Component} from "react";
import {Chart} from "react-google-charts";
import {TopicModel} from "../../models/TopicModel";


class TopicPieChart extends Component<any, any> {

    // @ts-ignore
    render() {
        const data: TopicModel[] = this.props.topics;
        const chartData = [['Topic', 'Probability']]
        data.forEach((i)=>{

            // @ts-ignore
            chartData.push([i.KeyWords.toString(), i.Probability]);
        })

        return (
            <Chart
                width={'100%'}
                height={'100%'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    title: 'Темы',
                    chartArea: { width: '100%' },
                }}
                rootProps={{'data-testid': '1'}}
            />);
    }
}


export default TopicPieChart;