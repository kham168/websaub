// // import { http } from "../core/http.service";
// // import { UPDATE_SENDING_ORDER_SELL_ENDPOINTS } from "../endpoints/updateSendingOrderSell.endpoint";

// // import type { UpdatePaddingOrderReviewResponse } from "../types/updatePaddingOrderReView-type";

// // export class UpdateSendingOrderSellService {
// //   async update(
// //     orderId: string,
// //     sellStatus: boolean,
// //     sellName: string,
// //     sellComment: string,
// //     token: string
// //   ): Promise<UpdatePaddingOrderReviewResponse> {
// //     try {
// //       const body = {
// //         orderId,
// //         sellStatus: sellStatus ? 2 : 1,
// //         sellName,
// //         sellComment

// //       };

// //       const response = await http.put(
// //         UPDATE_SENDING_ORDER_SELL_ENDPOINTS.UPDATE_SENDING_ORDER_SELL,
// //         body,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       return response as unknown as UpdatePaddingOrderReviewResponse;
// //     } catch (error) {
// //       console.error("Error updating padding order review:", error);
// //       throw error;
// //     }
// //   }
// // }
// // updateSendingOrderSell.service.ts
// import { http } from "../core/http.service";
// import { UPDATE_SENDING_ORDER_SELL_ENDPOINTS } from "../endpoints/updateSendingOrderSell.endpoint";
// import type { UpdatePaddingOrderReviewResponse } from "../types/updatePaddingOrderReView-type";

// export class UpdateSendingOrderSellService {
//   async update(
//     orderId: string,
//     sellStatus: number,
//     sellName: string,
//     sellComment: string,
//     token: string
//   ): Promise<UpdatePaddingOrderReviewResponse> {
//     try {
//       const body = {
//         orderId,
//         sellStatus : sellStatus ? 2 : 1,
//         sellName,
//         sellComment
//       };

//       console.log("📦 Service Update Body:", body);

//       const response = await http.put(
//         UPDATE_SENDING_ORDER_SELL_ENDPOINTS.UPDATE_SENDING_ORDER_SELL,
//         body,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return response as unknown as UpdatePaddingOrderReviewResponse;
//     } catch (error) {
//       console.error("Error updating padding order review:", error);
//       throw error;
//     }
//   }
// }
// updateSendingOrderSell.service.ts
import { http } from "../core/http.service";
import { UPDATE_SENDING_ORDER_SELL_ENDPOINTS } from "../endpoints/updateSendingOrderSell.endpoint";
import type { UpdatePaddingOrderReviewResponse } from "../types/updatePaddingOrderReView-type";

export class UpdateSendingOrderSellService {
  async update(
    orderId: string,
    sellStatus: number, // 0 = ກຳລັງຈັດສົ່ງ, 1 = ຈັດສົ່ງສຳເລັດ, 2 = ຍົກເລີກ
    sellName: string,
    sellComment: string,
    paymentMethod: number,
    token: string
  ): Promise<UpdatePaddingOrderReviewResponse> {
    try {
      const body = {
        orderId,
        sellStatus: String(sellStatus),// This will be 0, 1, or 2
        sellName,
        sellComment,
        paymentType:paymentMethod
      };

      console.log("📦 Service Update Body:", JSON.stringify(body, null, 2));

      const response = await http.put(
        UPDATE_SENDING_ORDER_SELL_ENDPOINTS.UPDATE_SENDING_ORDER_SELL,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response as unknown as UpdatePaddingOrderReviewResponse;
    } catch (error) {
      console.error("Error updating padding order review:", error);
      throw error;
    }
  }
}
