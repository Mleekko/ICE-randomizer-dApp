import {Config} from "@/common/config";

export const Manifests = {
    deposit(account: string, amount: number): string {
        return `
CALL_METHOD
    Address("${account}")
    "withdraw"
    Address("${Config.water_resource}")
    Decimal("${amount}")
;
TAKE_ALL_FROM_WORKTOP
    Address("${Config.water_resource}")
    Bucket("bucket1")
;
CALL_METHOD
    Address("${Config.component}")
    "deposit"
    Bucket("bucket1")
;
CALL_METHOD
    Address("${account}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
;
`;
    },
    withdraw(account: string, amount: number): string {
        return `
CALL_METHOD
    Address("${account}")
    "withdraw"
    Address("${Config.ticket}")
    Decimal("${amount}")
;
TAKE_ALL_FROM_WORKTOP
    Address("${Config.ticket}")
    Bucket("bucket1")
;
CALL_METHOD
    Address("${Config.component}")
    "withdraw"
    Bucket("bucket1")
;
CALL_METHOD
    Address("${account}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP")
;
`;
    },
};
