

export const renameDocs =(req,file,callback)=>{

    const name = file.originalname.split('.')[0];
    const fileName = file.originalname;
    const randomName = Array(4)
    .fill(null)
    .map(()=> Math.round(Math.random()* 16).toString(16))
    .join('');


    console.log(`${name}-${randomName}${fileName}`);
    callback(null, `${name}-${randomName}${fileName}`);

}