import superagent from 'superagent';
import cheerio from 'cheerio';

class WebCrawler {
    private _url: string;
    private _html = '';
    private _businessName:string[] = [];
    private _operatingName:string[] = [];
    /**
     *
     * @param url
     */
    constructor(url: string) {
        this._url = url;
        this.crawlRawHtml()
    }
    /**
     *
     * @return {string[]}
     */
    get businessName():string[] {
        return this._businessName;
    }
    /**
     *
     * @return {string[]}
     */
    get operatingName():string[] {
        return this._operatingName;
    }
    /**
     * Parse raw html and push data to _operatingName and _businessName
     */
    fetchData() {
        const $ = cheerio.load(this._html);
        const title = $('title').text().replace("\r", '').replace("\n", '').replace("\t", '').replace("\r\n", '');
        const container = $('div.col-xs-12').eq(0) // container
        const tables = container.find('.mrgn-tp-sm'); // data tables
        tables.map((index, table) => {
            const entry = $(table).text().replace("\n", '').replace("\t", '').trim();
            index % 2 === 0 ? this._businessName.push(entry) : this._operatingName.push(entry);

        })
        console.log(title)
        console.log(container.length)
    }
    /**
     *
     * @  crawl raw html
     */
    async crawlRawHtml() {
        const res = await superagent.get(this._url);
        this._html = res.text;
        this.fetchData()
        // console.log(this._html)
    }


}
const crawler = new WebCrawler('https://apps.cra-arc.gc.ca/ebci/hacc/cews/srch/pub/bscSrch?dsrdPg=1&q.srchNm=car&q.ordrClmn=NAME&q.ordrRnk=ASC');
