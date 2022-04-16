import superagent from 'superagent';
import cheerio, {parseHTML} from 'cheerio';
class WebCrawler {
    private _url: string;
    private _html = '';

    constructor(url: string) {
        this._url = url;
        this.crawlRawHtml()
    }
    fetchData() {
        const $ = cheerio.load(this._html);
        const title = $('title').text().replace("\r", '').replace("\n", '').replace("\t", '').replace("\r\n", '');
        // const container = $([class="col-xs-12"]).text();
        const container = $('div.col-xs-12').eq(1)

        console.log(title)
        console.log(container.text())
    }
    async crawlRawHtml() {
        const res = await superagent.get(this._url);
        this._html = res.text;
        this.fetchData()
        // console.log(this._html)
    }


}
const crawler = new WebCrawler('https://apps.cra-arc.gc.ca/ebci/hacc/cews/srch/pub/bscSrch?dsrdPg=1&q.srchNm=car&q.ordrClmn=NAME&q.ordrRnk=ASC');
