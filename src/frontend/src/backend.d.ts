import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface OnboardingEntry {
    schoolSize: string;
    contactName: string;
    role: string;
    contactEmail: string;
    contactPhone: string;
    schoolName: string;
}
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export interface backendInterface {
    getAllOnboardings(): Promise<Array<OnboardingEntry>>;
    getOnboardingCount(): Promise<bigint>;
    submitOnboarding(schoolName: string, schoolSize: string, contactName: string, contactEmail: string, contactPhone: string, role: string): Promise<Result>;
}
