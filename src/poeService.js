const axios = require('axios').default;

const content = require('./content.json');
const {users} = require('./config').config;

var league = 'Heist'

async function queryItem(keywords) {
    let dataList = await searchTrade(keywords);
    const url = 'http://pathofexile.com/trade/search/Heist/' + dataList.id;

    if (dataList.total == 0) {
        return {
            url: url,
            itemList: [],
            total: dataList.total
        }
    }
    
    let mappedDataList = await mapData(dataList);

    let processedData = processData(mappedDataList);

    return {
        url: url,
        itemList: processedData,
        total: dataList.total
    }
}

async function searchTrade(keywords) {
    let res = await axios.post('https://www.pathofexile.com/api/trade/search/' + league, {
        query: {
            status: {
                option: "online"
            },
            stats: [{
                type: "and",
                filters: []
            }],
            term: keywords
        },
        sort: {
            price: "asc"
        }
    });

    return res.data
}

async function mapData(data) {
    let id = data.id;
    let result = data.result;

    if (result.length >= 5) {
        result = result.splice(0, 5);
    }

    let res = await axios.get('https://www.pathofexile.com/api/trade/fetch/' + result.join(','), {
        params: {
            query: id
        }
    });

    return res.data.result;
}

function processData(mappedList) {
    return mappedList.map(item => getItemInfo(item))
}

function getItemInfo(itemObject) {

    console.log(itemObject);

    const item = [itemObject.item.name, itemObject.item.typeLine];
    const price = [itemObject.listing.price.amount, itemObject.listing.price.currency].join(' ');
    const icon = itemObject.item.icon;

    return {
        name: item,
        price: price,
        icon: icon
    }
}

function setLeague(newLeague) {
    league = newLeague;
}

module.exports = {
    queryItem,
    setLeague
}