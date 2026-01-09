import typeAmaranthusService from "~/services/api/type_amaranthus.service";
export const useTypeAmaranthu = () => {
    const totken = useCookie<string>('token').value;

    const TypeAmaranthusItemInsert = async (data: any, files: File[]) => {
        const channel = useCookie('channel').value;
        const formData = new FormData();
        const id = "PRD" + Date.now();
        formData.append("id", id);
        formData.append("channel", channel as string);
        formData.append("name", data.name);
        formData.append("price1", data.price1);
        formData.append("price2", data.price2);
        formData.append("price3", data.price3);
        formData.append("moreDetail", data.moredetail);
        formData.append("type", data.type);
        formData.append("totalRoom", data.totalRoom);
        formData.append("activeRoom", data.activeroom);
        formData.append("locationvideo", data.locationvideo);
        formData.append("contactnumber", data.contactnumber);
        formData.append("province", data.province);
        formData.append("district", data.district);
        formData.append("village", data.village);
        formData.append("area", data.area);
        formData.append("tel", data.phone);
        files.forEach((file) => {
            formData.append("files", file); 
        });
        console.log("🚀 ~ file: useTypeAmaranthu.ts ~ line 24 ~ TypeAmaranthusItemInsert ~ formData=====", formData)
        const resp = await typeAmaranthusService.getType_AmaranthusInsert(formData, totken);
        return resp.success;
    }
    return {
        TypeAmaranthusItemInsert
    }
}
// import typeAmaranthusService from "~/services/api/type_amaranthus.service";

// export const useTypeAmaranthu = () => {
//   const token = useCookie<string>("token").value;
//   const channel = useCookie<string>("channel").value;

//   const TypeAmaranthusItemInsert = async (data: any, files: File[]) => {
//     if (!token) throw new Error("Token missing");
//     if (!channel) throw new Error("Channel missing");

//     const formData = new FormData();
//     const id = "PRD" + Date.now();

//     // ---------- STRING ----------
//     formData.append("id", id);
//     formData.append("channel", String(channel));
//     formData.append("name", data.name ?? "");
//     formData.append("moreDetail", data.moredetail ?? "");
//     formData.append("type", data.type ?? "");
//     formData.append("locationvideo", data.locationvideo ?? "");
//     formData.append("contactnumber", data.contactnumber ?? "");
//     formData.append("province", data.province ?? "");
//     formData.append("district", data.district ?? "");
//     formData.append("village", data.village ?? "");
//     formData.append("tel", data.phone ?? "");

//     // ---------- NUMBER (IMPORTANT) ----------
//     formData.append("price1", String(Number(data.price1)));
//     formData.append("price2", String(Number(data.price2)));
//     formData.append("price3", String(Number(data.price3)));
//     formData.append("totalRoom", String(Number(data.totalRoom)));
//     formData.append("activeroom", String(Number(data.activeroom)));
//     formData.append("area", String(Number(data.area)));

//     // ---------- FILES ----------
//     files.forEach((file) => {
//       formData.append("files", file);
//     });

//     // DEBUG
//     for (const [k, v] of formData.entries()) {
//       console.log(k, v);
//     }

//     const resp = await typeAmaranthusService.getType_AmaranthusInsert(
//       formData,
//       token
//     );

//     return resp.success;
//   };

//   return { TypeAmaranthusItemInsert };
// };
