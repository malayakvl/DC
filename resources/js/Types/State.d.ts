declare namespace State {
    interface Root {
        layout: Layouts;
        staff: Staffs;
        service: any;
    }

    type Layouts = Layouts.Root;
    type Staffs = Staffs.Root
}
