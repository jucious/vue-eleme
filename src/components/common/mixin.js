export const getImgPath = {
    methods: {
        getImgPath(path){
            let suffix;
            if(!path){
                return '//elm.cangdu.org/img/default.jpg'
            }
            if(!path.includes('jpeg')){
                suffix = '.png'
            }else{
                suffix = '.jpeg'
            }
            let url = '/'+path.substr(0,1)+'/'+path.substr(1,2)+'/'+path.substr(3)+suffix;
            return 'https://fuss10.elemecdn.com' + url;
        }
    },
}