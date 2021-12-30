class ApiFeatures{
    constructor(query,queryStr){
        this.query = query,
        this.queryStr = queryStr
    }

    search(){
        const keyword = this.queryStr.keyword 
        ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : 'i' //case insensitive
            }
        }
        :{}

        this.query = this.query.find({...keyword})

        return this
    }

    filter(){
        var queryCopy = {...this.queryStr}         

        //------------------to filter products by category-------------------------

        const removeFields = ["keyword" , "page" , "limit"];

        removeFields.forEach((i) => delete queryCopy[i]); 

        //------------------to filter products by price-range & ratings----------------------

        let queryStr = JSON.stringify(queryCopy) 

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g , key => `$${key}`); 
       
        this.query = this.query.find(JSON.parse(queryStr));
        
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures