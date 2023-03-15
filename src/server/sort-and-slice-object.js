/**
 * Returns a new object containing the top `count` entries of the given object, sorted by their values in ascending order.
 * @param {Object} object - The object to sort and select the top entries from.
 * @param {number} count - The number of entries to select from the object.
 * @returns {Object} - An object containing the top `count` entries from the given object, sorted by value in ascending order.
 */

function selectTopsortObject(object, count){
    try{
        let topSortedObjectList = Object.entries(object).sort((a,b)=> a[1]-b[1]).slice(0,count);
        let topSortedObject= topSortedObjectList.reduce((acc, [key, value])=>{
            acc[key]=value;
            return acc;
        },{});
        return topSortedObject;     
    }catch(err){
        console.log(err);
        return {};
    }
}

module.exports = selectTopsortObject;