//feed接口，即根据笔记ID获取笔记详情
import axios from "axios";
import {X_S} from "../sign/X-S/X-S_deprecated.js";
import {x_s_common} from "../sign/X-S-Common/X-S-Common.js";
import {b1, my_cookie,cookie_a1} from "../config.js";
import {getRamNumber} from "../utils/random.js";
import {get_xs_xt} from "../sign/X-S/X-S.js";

//xsec_token疑似不需要
export const feed = async (note_id, xsec_token) => {
    const data = {
        "source_note_id": note_id,
        "image_formats": ["jpg", "webp", "avif"],
        "extra": {"need_body_topic": "1"},
        "xsec_source": "pc_feed",
        "xsec_token": xsec_token
    }
    const url = '/api/sns/web/v1/feed'
    const temp_sign =await get_xs_xt(url,data,cookie_a1)
    const x_s=temp_sign['X-s']
    const x_t=temp_sign['X-t']
    return (await axios.post(url, data, {
        headers: {
            'Accept': "application/json, text/plain, */*",
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
            'Content-Type': 'application/json;charset=UTF-8',
            'Cookie': my_cookie,
            'Priority': 'u=1, i',
            'Referer': 'https://www.xiaohongshu.com/',
            'Sec-Ch-Ua':
                `"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"`,
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': "Windows",
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0',
            'X-B3-Traceid': getRamNumber(),
            'X-S': x_s,
            'X-T': x_t,
            'X-S-Common': x_s_common(x_s, x_t, b1)
        }
    })).data
}



