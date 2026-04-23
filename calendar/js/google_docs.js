async function getGoogleJson(api_url) {
    let result = [];

    try {
        const response = await fetch(api_url);

        if (!response.ok) {
            console.error(`Request failed with status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        const values = data["values"];

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
    } catch (error) {
        console.error(`Request failed: ${error}`);
        return null;
    }

    const jsonString = JSON.stringify(result);
    const blob = new Blob([jsonString], { type: 'application/json' });
    return URL.createObjectURL(blob);
}

async function getMultiGoogleJson(api_url) {
    console.log(api_url);
    let result = [];

    try {
        const response = await fetch(api_url);

        if (!response.ok) {
            console.error(`Request failed with status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        const valueRanges = data["valueRanges"];

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
    } catch (error) {
        console.error(`Request failed: ${error}`);
        return null;
    }

    const jsonString = JSON.stringify(result);
    const blob = new Blob([jsonString], { type: 'application/json' });
    return URL.createObjectURL(blob);
}
