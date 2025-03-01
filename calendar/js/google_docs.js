function getGoogleJson(api_url) {
    let xhr0 = new XMLHttpRequest();
    let result = [];

    xhr0.open('GET', api_url, false);
    xhr0.send();

    if (xhr0.status === 200) {
        let data = JSON.parse(xhr0.responseText);
        let values = data["values"];
        values.forEach(value => {
            let state = value[0];
            let name = value[1];
            let province = value[2];
            let date = value[3];
            let qqGroup = value[4];
            let description;
            if (state) {
                if (state == "取消") {
                    description = "活动已取消";
                } else {
                    description = null;
                }
            }
            let object = {
                "name": name,
                "date": date,
                "QQgroup": qqGroup,
                "description": description,
                "type": "event",
                "color": "#63d867"
            };
            result.push(object);
        });
    } else {
        console.error(`Request failed with status: ${xhr0.status}`);
        return null;
    }
    
    const jsonString = JSON.stringify(result);
    const blob = new Blob([jsonString], { type: 'application/json' });
    return URL.createObjectURL(blob);
}
function getMultiGoogleJson(api_url) {
    console.log(api_url)
    let xhr0 = new XMLHttpRequest();
    let result = [];

    xhr0.open('GET', api_url, false);
    xhr0.send();

    if (xhr0.status === 200) {
        let data = JSON.parse(xhr0.responseText);
        let valueRanges = data["valueRanges"];
        valueRanges.forEach(obj => {
            let values = obj["values"];
            if(values == null) values = [];
            values.forEach(value => {
                let state = value[0];
                let name = value[1];
                let province = value[2];
                let date = value[3];
                let qqGroup = value[4];
                let description;
                if (state) {
                    if (state == "取消") {
                        description = "活动已取消";
                    } else {
                        description = null;
                    }
                }
                let object = {
                    "name": name,
                    "date": date,
                    "QQgroup": qqGroup,
                    "description": description,
                    "type": "event",
                    "color": "#63d867"
                };
                result.push(object);
            });
        });
    } else {
        console.error(`Request failed with status: ${xhr0.status}`);
        return null;
    }

    const jsonString = JSON.stringify(result);
    const blob = new Blob([jsonString], { type: 'application/json' });
    return URL.createObjectURL(blob);
}