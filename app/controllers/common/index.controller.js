
class index{

    getExporter(req,res){
        var r = req.r;
        r.db('eu2').table('exporter').run().then(function(result) {
            res.json(result);
        }).catch(function(err){
            res.json(err);
        });
    }
    getYear(req,res){
        var r = req.r;
        r.db('eu2').table('quota').pluck('year').distinct().orderBy(r.desc('year'))
        .run().then(function(result) {
            var year = result.map((item)=>{
                return item.year.toString();
            })
            res.json(year);
        }).catch(function(err){
            res.json(err);
        });
    }
    getTypeRice(req,res){
        var r = req.r;
        r.db('eu2').table('type_rice').run().then(function(result) {
            res.json(result);
        }).catch(function(err){
            res.json(err);
        });
    }
}

module.exports = new index();