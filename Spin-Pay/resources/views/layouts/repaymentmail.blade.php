<center>
    <div>
        <h2>SpinPay Payment Details</h2>
    </div>
    <div>
        <h1>Loan Repayment Alert Aganist SPINPAY00E{{ $loanid }}</h1>
    </div>
    <div>
        <h1>Transaction ID SPINPAY00E{{ $tid }} </h1>
    </div>
    <div>
        <h2>Loan Repayment BreakDown</h2>
        <table class="table table-hover">
            <tbody>
                <tr>
                    <th scope="row">*</th>
                    <td>Loan Amount </td>
                    <td><span style="color:red">{{ $loanamount }}</span></td>
                </tr>
                <tr>
                    <th scope="row">*</th>
                    <td>Processing Fee</td>
                    <td><span style="color:red">{{ $processing_fee }}</span></td>
                </tr>
                <tr>
                    <th scope="row">*</th>
                    <td>Interest</td>
                    <td><span style="color:red">{{ $interest }}</span></td>
                </tr>
                <tr>
                    <th scope="row">*</th>
                    <td>Late Fee </td>
                    <td><span style="color:red">{{ $late_fee }}</span></td>
                </tr>
                <tr>
                    <th scope="row">*</th>
                    <td>GST</td>
                    <td><span style="color:red">{{ $gst }}</span></td>
                </tr>
                <tr>
                    <th scope="row">*</th>
                    <td>Total Amount </td>
                    <td><span style="color:red">{{ $total }}</span></td>
                </tr>
            </tbody>
        </table>
    </div>
</center>
